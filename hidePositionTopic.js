import avro from 'avsc';

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'x',
      type: 'int',
    },
    {
      name: 'y',
      type: 'int',
    }
  ]
});
