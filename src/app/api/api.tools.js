import ensureArray from 'ensure-array';
import find from 'lodash/find';
import isPlainObject from 'lodash/isPlainObject';
import uuid from 'uuid';
import settings from '../config/settings';
import logger from '../lib/logger';
import config from '../services/configstore';
import { getPagingRange } from './paging';
import {
    ERR_BAD_REQUEST,
    ERR_NOT_FOUND,
    ERR_INTERNAL_SERVER_ERROR
} from '../constants';

const log = logger('api:tools');
const CONFIG_KEY = 'tools';

const getSanitizedRecords = () => {
    const records = ensureArray(config.get(CONFIG_KEY, []));

    let shouldUpdate = false;
    for (let i = 0; i < records.length; ++i) {
        if (!isPlainObject(records[i])) {
            records[i] = {};
        }

        const record = records[i];

        if (!record.id) {
            record.id = uuid.v4();
            shouldUpdate = true;
        }
    }

    if (shouldUpdate) {
        log.debug(`update sanitized records: ${JSON.stringify(records)}`);

        // Pass `{ silent changes }` will suppress the change event
        config.set(CONFIG_KEY, records, { silent: true });
    }

    return records;
};

export const fetch = (req, res) => {
    const records = getSanitizedRecords();
    const paging = !!req.query.paging;

    if (paging) {
        const { page = 1, pageLength = 10 } = req.query;
        const totalRecords = records.length;
        const [begin, end] = getPagingRange({ page, pageLength, totalRecords });
        const pagedRecords = records.slice(begin, end);

        res.send({
            pagination: {
                page: Number(page),
                pageLength: Number(pageLength),
                totalRecords: Number(totalRecords)
            },
            records: pagedRecords.map(record => {
                const { id, name, number, zOffset, pickupX, pickupY, pickupZ = {} } = { ...record };
                return { id, name, number, zOffset, pickupX, pickupY, pickupZ };
            })
        });
    } else {
        res.send({
            records: records.map(record => {
                const { id, name, number, zOffset, pickupX, pickupY, pickupZ = {} } = { ...record };
                return { id, name, number, zOffset, pickupX, pickupY, pickupZ };
            })
        });
    }
};

export const create = (req, res) => {
    const { name, number, zOffset, pickupX, pickupY, pickupZ = {} } = { ...req.body };

    if (!name) {
        res.status(ERR_BAD_REQUEST).send({
            msg: 'The "name" parameter must not be empty'
        });
        return;
    }

    if (!number) {
        res.status(ERR_BAD_REQUEST).send({
            msg: 'The "number" parameter must not be empty'
        });
        return;
    }

    try {
        const records = getSanitizedRecords();
        const record = {
            id: uuid.v4(),
            name: name,
            number: number,
            zOffset: zOffset,
            pickupX: pickupX,
            pickupY: pickupY,
            pickupZ: pickupZ
        };

        records.push(record);
        config.set(CONFIG_KEY, records);

        res.send({ err: null });
    } catch (err) {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({
            msg: 'Failed to save ' + JSON.stringify(settings.cncrc)
        });
    }
};

export const read = (req, res) => {
    const id = req.params.id;
    const records = getSanitizedRecords();
    const record = find(records, { id: id });

    if (!record) {
        res.status(ERR_NOT_FOUND).send({
            msg: 'Not found'
        });
        return;
    }

    const { name, number, zOffset, pickupX, pickupY, pickupZ = {} } = { ...record };
    res.send({ id, name, number, zOffset, pickupX, pickupY, pickupZ });
};

export const update = (req, res) => {
    const id = req.params.id;
    const records = getSanitizedRecords();
    const record = find(records, { id: id });

    if (!record) {
        res.status(ERR_NOT_FOUND).send({
            msg: 'Not found'
        });
        return;
    }

    const {
        name = record.name,
        number = record.number,
        zOffset = record.zOffset,
        pickupX = record.pickupX,
        pickupY = record.pickupY,
        pickupZ = record.pickupZ
    } = { ...req.body };

    /*
    if (!name) {
        res.status(ERR_BAD_REQUEST).send({
            msg: 'The "name" parameter must not be empty'
        });
        return;
    }

    if (!command) {
        res.status(ERR_BAD_REQUEST).send({
            msg: 'The "command" parameter must not be empty'
        });
        return;
    }
    */

    try {
        record.name = String(name || '');
        record.number = number;
        record.zOffset = parseFloat(zOffset);
        record.pickupX = parseFloat(pickupX);
        record.pickupY = parseFloat(pickupY);
        record.pickupZ = parseFloat(pickupZ);

        config.set(CONFIG_KEY, records);

        res.send({ err: null });
    } catch (err) {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({
            msg: 'Failed to save ' + JSON.stringify(settings.cncrc)
        });
    }
};

export const bulkUpdate = (req, res) => {
    const { records } = { ...req.body };

    if (!records) {
        res.status(ERR_BAD_REQUEST).send({
            msg: 'The "records" parameter must not be empty'
        });
        return;
    }

    const filteredRecords = ensureArray(records)
        .filter(record => isPlainObject(record));

    for (let i = 0; i < filteredRecords.length; ++i) {
        const record = filteredRecords[i];
        const { id, name, number, zOffset, pickupX, pickupY, pickupZ = {} } = { ...record };

        if (!id) {
            record.id = uuid.v4();
        }
        record.name = String(name || '');
        record.number = number;
        record.zOffset = parseFloat(zOffset);
        record.pickupX = parseFloat(pickupX);
        record.pickupY = parseFloat(pickupY);
        record.pickupZ = parseFloat(pickupZ);
    }

    try {
        config.set(CONFIG_KEY, filteredRecords);
        res.send({ err: null });
    } catch (err) {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({
            msg: 'Failed to save ' + JSON.stringify(settings.cncrc)
        });
    }
};

export const __delete = (req, res) => {
    const id = req.params.id;
    const records = getSanitizedRecords();
    const record = find(records, { id: id });

    if (!record) {
        res.status(ERR_NOT_FOUND).send({
            msg: 'Not found'
        });
        return;
    }

    try {
        const filteredRecords = records.filter(record => {
            return record.id !== id;
        });
        config.set(CONFIG_KEY, filteredRecords);

        res.send({ err: null });
    } catch (err) {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({
            msg: 'Failed to save ' + JSON.stringify(settings.cncrc)
        });
    }
};
