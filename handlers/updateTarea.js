// handlers/updateTarea.js

const AWS = require('aws-sdk');

// Crear instancia de DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });

// Nombre de la tabla
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {
  try {
    // Obtener el tareaId de los parámetros de ruta
    const { tareaId } = event.pathParameters;

    // Validar que tareaId esté presente
    if (!tareaId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Se requiere el ID de la tarea' }),
      };
    }

    // Parsear el cuerpo de la solicitud
    const data = JSON.parse(event.body);

    // Validar que haya datos para actualizar
    if (!data || Object.keys(data).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No hay datos para actualizar' }),
      };
    }

    // Construir los parámetros de actualización
    const params = {
      TableName: tableName,
      Key: { tareaId },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW',
    };

    let prefix = 'set ';
    const attributes = Object.keys(data);

    // Construir la expresión de actualización dinámicamente
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      params.UpdateExpression += `${prefix}#${attribute} = :${attribute}`;
      params.ExpressionAttributeNames[`#${attribute}`] = attribute;
      params.ExpressionAttributeValues[`:${attribute}`] = data[attribute];
      prefix = ', ';
    }

    // Actualizar la tarea en DynamoDB
    const result = await dynamoDb.update(params).promise();

    // Devolver la tarea actualizada
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo actualizar la tarea' }),
    };
  }
};
