export default {
    name: "audio",
    title: "Audio",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Título",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "description",
        title: "Descripción",
        type: "text",
      },
      {
        name: "audioFile",
        title: "Archivo de Audio",
        type: "file",
        options: {
          accept: "audio/*",
        },
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "audioFile",
      },
    },
  }
  
  