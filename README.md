# Dashboards-server

## Code Documentation

You can find in this [link](https://docs.google.com/document/d/1g5Rtkfnynjrl25uLGr_flklEqyrIvxTm1RpqIHzRZmA/edit?usp=sharing)  documentation containing:
- Project structure
- DB selection
- End-to-end flow chart
- Json schema example

## Known Bugs
- Create schema only supports properties defined under the 'properties' field. The properties type cannot be of type array and they cannot be nested. You can find an example of json schema in the [documentation link](https://docs.google.com/document/d/1g5Rtkfnynjrl25uLGr_flklEqyrIvxTm1RpqIHzRZmA/edit?usp=sharing) under json schema example.
- Create schema input is only validated by json format validation and not json schema validation. For example, if a property type is 'stringf' instead of 'string' the schema will still be created.
- Schema id is not directly connected to the chart. Meaning if we created a chart based on 'field1' then any events containing the 'field1' will be displayed within that chart.

## Run Code
- git clone https://github.com/avivhertzman/dashboards-server.git
- npm install
- cd src
- ts-node server.ts

## App Demo
![](https://github.com/avivhertzman/dashboards-server/blob/00e051b6fc23b84c180a8e2d417ec900692f5592/assets/ezgif.com-crop.gif)
