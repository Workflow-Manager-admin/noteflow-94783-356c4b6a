const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Noteflow REST API',
      version: '1.0.0',
      description: 'RESTful API for Noteflow notes app. Provides CRUD, search/filter, and health endpoints.',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique note ID', example: '6dd23e01b960459e821d72' },
            title: { type: 'string', description: 'Note title', example: 'My Note Title' },
            body: { type: 'string', description: 'Note body', example: 'This is a note body.' },
            favorite: { type: 'boolean', description: 'Mark as favorite', example: true },
            color: { type: 'string', description: 'Note highlight color', example: '#FF9900' },
            userId: { type: 'string', description: 'User who owns the note', example: 'abc123', nullable: true },
            createdAt: { type: 'string', format: 'date-time', description: 'Created timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last updated timestamp' },
          }
        },
        NotePayload: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Note title' },
            body: { type: 'string', description: 'Note body', nullable: true },
            favorite: { type: 'boolean', description: 'Mark as favorite', nullable: true },
            color: { type: 'string', description: 'Note highlight color', nullable: true },
            userId: { type: 'string', description: 'User id', nullable: true }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
