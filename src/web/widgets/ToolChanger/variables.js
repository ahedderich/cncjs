import variables from '../Macro/variables';

let toolVariables = variables.slice(0);
toolVariables.unshift('[next_tool_pickup_z]');
toolVariables.unshift('[next_tool_pickup_y]');
toolVariables.unshift('[next_tool_pickup_x]');
toolVariables.unshift('[next_tool_z_offset]');
toolVariables.unshift('[next_tool_number]');
toolVariables.unshift({ type: 'header', text: 'Next Tool Variables' });
toolVariables.unshift('[current_tool_pickup_z]');
toolVariables.unshift('[current_tool_pickup_y]');
toolVariables.unshift('[current_tool_pickup_x]');
toolVariables.unshift('[current_tool_z_offset]');
toolVariables.unshift('[current_tool_number]');
toolVariables.unshift({ type: 'header', text: 'Current Tool Variables' });
module.exports = toolVariables;
