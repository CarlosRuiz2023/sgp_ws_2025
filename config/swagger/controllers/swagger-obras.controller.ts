export class SwaggerObraController {
    tag: any = {
        name: "obras",
        description: "Operaciones relacionadas con las obras (Access y SQL)"
    };

    /* 
    
    public getObrasAccess = {
        get: {
          tags: [this.tag.name],
          summary: "Obtener todas las obras (Access)",
          operationId: "getObrasAccess",
          parameters: [
            {
              in: "query",
              name: "limit",
              description: "Límite de registros a buscar",
              required: true,
              schema: {
                type: "integer",
                default: 10
              }
            },
            {
              in: "query",
              name: "page",
              description: "Página seleccionada",
              required: true,
              schema: {
                type: "integer",
                default: 1
              }
            },
            {
              in: "query",
              name: "filtro",
              description: "Búsqueda por calle o estatus",
              required: true,
              schema: {
                type: "string",
                default: ""
              }
            }
          ],
          responses: {
            200: { description: "Operación exitosa" },
            400: { description: "Petición errónea" },
            404: { description: "No se encontraron obras" },
            500: { description: "Error interno del servidor" }
          }
        }
      };
      
    */
    public getObrasAccess = {
        post: {
            tags: [this.tag.name],
            summary: "Obtener todas las obras (Access)",
            operationId: "getObrasAccess",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros de búsqueda",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            limit: {
                                type: "integer",
                                description: "Límite de registros a buscar",
                                default: 10
                            },
                            page: {
                                type: "integer",
                                description: "Página seleccionada",
                                default:1
                            },
                            filtro: {
                                type: "string",
                                description: "Búsqueda por calle o estatus",
                                default:""
                            }
                        },
                        required: ["limit", "page", "filtro"]
                    }
                }
            ],
            responses: {
                200: { description: "Operación exitosa" },
                404: { description: "No se encontraron obras" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getObraAccess = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener obra por clave (Access)",
            operationId: "getObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000013"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra encontrada" },
                404: { description: "Obra no encontrada" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public postObraAccess = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar una nueva obra (Access)",
            operationId: "postObraAccess",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros de la obra",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            obr_clv: {
                                type: "string",
                                description: "Clave de la obra",
                                default:"0000000728"
                            },
                            obr_call: {
                                type: "string",
                                description: "Nombre de la calle",
                                default:"MADRE ROSA"
                            },
                            obr_col: {
                                type: "string",
                                description: "Id de la colonia",
                                default:"101"
                            },
                            obr_cost: {
                                type: "double",
                                description: "Costo de la obra",
                                default:4322.18
                            },
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"2"
                            },
                            obr_tramo: {
                                type: "string",
                                description: "Tramo de la obra",
                                default:"CALLE ROSADA- CALLE EXPARZA"
                            },
                            obr_fecha: {
                                type: "string",
                                description: "Fecha d ela obra",
                                default:"03/04/2025"
                            },
                            obr_sis: {
                                type: "string",
                                description: "Sistema de la obra",
                                default:"80"
                            },
                            col_nom: {
                                type: "string",
                                description: "Colonia de la obra",
                                default:"JEFRREY DAHMER"
                            },
                            obr_programa: {
                                type: "string",
                                description: "Id del programa de la obra",
                                default:"109"
                            },
                            obr_fecinip: {
                                type: "string",
                                description: "Fecha de inicio del proyecto",
                                default:"03/04/2025"
                            },
                            obr_fecvenp: {
                                type: "string",
                                description: "Fecha calculada de vencimiento del proyecto",
                                default:"12/06/2025"
                            },
                            obr_npago: {
                                type: "integer",
                                description: "Numero de pagos de la obra",
                                default: 18
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 01165"
                            }
                        },
                        required: ["obr_clv","obr_call","obr_col","obr_cost","obr_stat","obr_tramo","obr_fecha","obr_sis","col_nom","obr_programa","obr_fecinip","obr_fecvenp","obr_npago","obr_opergob"]
                    }
                }
            ],
            responses: {
                201: { description: "Obra creada exitosamente" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar obra (Access)",
            operationId: "putObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000728"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_call: {
                                type: "string",
                                description: "Nombre de la calle",
                                default:"MADRE ROSA act 2"
                            },
                            obr_col: {
                                type: "string",
                                description: "Id de la colonia",
                                default:"101"
                            },
                            obr_cost: {
                                type: "double",
                                description: "Costo de la obra",
                                default:4322.18
                            },
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"2"
                            },
                            obr_tramo: {
                                type: "string",
                                description: "Tramo de la obra",
                                default:"CALLE ROSADA- CALLE EXPARZA"
                            },
                            obr_fecha: {
                                type: "string",
                                description: "Fecha d ela obra",
                                default:"03/04/2025"
                            },
                            obr_sis: {
                                type: "string",
                                description: "Sistema de la obra",
                                default:"80"
                            },
                            col_nom: {
                                type: "string",
                                description: "Colonia de la obra",
                                default:"JEFRREY DAHMER"
                            },
                            obr_programa: {
                                type: "string",
                                description: "Id del programa de la obra",
                                default:"109"
                            },
                            obr_fecinip: {
                                type: "string",
                                description: "Fecha de inicio del proyecto",
                                default:"03/04/2025"
                            },
                            obr_fecvenp: {
                                type: "string",
                                description: "Fecha calculada de vencimiento del proyecto",
                                default:"12/06/2025"
                            },
                            obr_npago: {
                                type: "integer",
                                description: "Numero de pagos de la obra",
                                default: 18
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 01165"
                            }
                        },
                        required: ["obr_call","obr_col","obr_cost","obr_stat","obr_tramo","obr_fecha","obr_sis","col_nom","obr_programa","obr_fecinip","obr_fecvenp","obr_npago","obr_opergob"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra actualizada exitosamente" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putEstatusObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Cambiar estatus de la obra (Access)",
            operationId: "putEstatusObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000728"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"5"
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 99999"
                            }
                        },
                        required: ["obr_stat","obr_opergob"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Estatus actualizado" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putCostoObraAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Incrementar costo de obra (Access)",
            operationId: "putCostoObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000728"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_inc: {
                                type: "double",
                                description: "Incremento de la obra",
                                default: 100.12
                            },
                        },
                        required: ["obr_inc"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Costo actualizado" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public deleteObraAccess = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar obra (Access)",
            operationId: "deleteObraAccess",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000728"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra eliminada" },
                404: { description: "Obra no encontrada" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getObrasSql = {
        post: {
            tags: [this.tag.name],
            summary: "Obtener todas las obras (Sql)",
            operationId: "getObrasSql",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros de búsqueda",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            limit: {
                                type: "integer",
                                description: "Límite de registros a buscar",
                                default: 10
                            },
                            page: {
                                type: "integer",
                                description: "Página seleccionada",
                                default:1
                            },
                            filtro: {
                                type: "string",
                                description: "Búsqueda por calle o estatus",
                                default:""
                            }
                        },
                        required: ["limit", "page", "filtro"]
                    }
                }
            ],
            responses: {
                200: { description: "Operación exitosa" },
                404: { description: "No se encontraron obras" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getObraSql = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener obra por clave (Sql)",
            operationId: "getObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000728"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra encontrada" },
                404: { description: "Obra no encontrada" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public postObraSql = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar una nueva obra (Sql)",
            operationId: "postObraSql",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros de la obra",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            obr_clv: {
                                type: "string",
                                description: "Clave de la obra",
                                default:"0000000721"
                            },
                            obr_call: {
                                type: "string",
                                description: "Nombre de la calle",
                                default:"MADRE ROSA"
                            },
                            obr_col: {
                                type: "string",
                                description: "Id de la colonia",
                                default:"101"
                            },
                            obr_cost: {
                                type: "double",
                                description: "Costo de la obra",
                                default:4322.18
                            },
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"2"
                            },
                            obr_tramo: {
                                type: "string",
                                description: "Tramo de la obra",
                                default:"CALLE ROSADA- CALLE EXPARZA"
                            },
                            obr_fecha: {
                                type: "string",
                                description: "Fecha d ela obra",
                                default:"03/04/2025"
                            },
                            obr_sis: {
                                type: "string",
                                description: "Sistema de la obra",
                                default:"80"
                            },
                            col_nom: {
                                type: "string",
                                description: "Colonia de la obra",
                                default:"JEFRREY DAHMER"
                            },
                            obr_programa: {
                                type: "string",
                                description: "Id del programa de la obra",
                                default:"109"
                            },
                            obr_fecinip: {
                                type: "string",
                                description: "Fecha de inicio del proyecto",
                                default:"03/04/2025"
                            },
                            obr_fecvenp: {
                                type: "string",
                                description: "Fecha calculada de vencimiento del proyecto",
                                default:"12/06/2025"
                            },
                            obr_npago: {
                                type: "integer",
                                description: "Numero de pagos de la obra",
                                default: 18
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 01165"
                            }
                        },
                        required: ["obr_clv","obr_call","obr_col","obr_cost","obr_stat","obr_tramo","obr_fecha","obr_sis","col_nom","obr_programa","obr_fecinip","obr_fecvenp","obr_npago","obr_opergob"]
                    }
                }
            ],
            responses: {
                201: { description: "Obra creada exitosamente" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar obra (Sql)",
            operationId: "putObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000721"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_call: {
                                type: "string",
                                description: "Nombre de la calle",
                                default:"MADRE ROSA act 2"
                            },
                            obr_col: {
                                type: "string",
                                description: "Id de la colonia",
                                default:"101"
                            },
                            obr_cost: {
                                type: "double",
                                description: "Costo de la obra",
                                default:4322.18
                            },
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"2"
                            },
                            obr_tramo: {
                                type: "string",
                                description: "Tramo de la obra",
                                default:"CALLE ROSADA- CALLE EXPARZA"
                            },
                            obr_fecha: {
                                type: "string",
                                description: "Fecha d ela obra",
                                default:"03/04/2025"
                            },
                            obr_sis: {
                                type: "string",
                                description: "Sistema de la obra",
                                default:"80"
                            },
                            col_nom: {
                                type: "string",
                                description: "Colonia de la obra",
                                default:"JEFRREY DAHMER"
                            },
                            obr_programa: {
                                type: "string",
                                description: "Id del programa de la obra",
                                default:"109"
                            },
                            obr_fecinip: {
                                type: "string",
                                description: "Fecha de inicio del proyecto",
                                default:"03/04/2025"
                            },
                            obr_fecvenp: {
                                type: "string",
                                description: "Fecha calculada de vencimiento del proyecto",
                                default:"12/06/2025"
                            },
                            obr_npago: {
                                type: "integer",
                                description: "Numero de pagos de la obra",
                                default: 18
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 01165"
                            }
                        },
                        required: ["obr_call","obr_col","obr_cost","obr_stat","obr_tramo","obr_fecha","obr_sis","col_nom","obr_programa","obr_fecinip","obr_fecvenp","obr_npago","obr_opergob"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra actualizada exitosamente" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putEstatusObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Cambiar estatus de la obra (Sql)",
            operationId: "putEstatusObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000721"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_stat: {
                                type: "string",
                                description: "Id del estatus de la obra",
                                default:"5"
                            },
                            obr_opergob: {
                                type: "string",
                                description: "Clave opergob de la obra",
                                default:"22530 0000 0001 1422 99999"
                            }
                        },
                        required: ["obr_stat","obr_opergob"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Estatus actualizado" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putCostoObraSql = {
        put: {
            tags: [this.tag.name],
            summary: "Incrementar costo de obra (Sql)",
            operationId: "putCostoObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000721"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            obr_inc: {
                                type: "double",
                                description: "Incremento de la obra",
                                default: 100.12
                            },
                        },
                        required: ["obr_inc"]
                    }
                }
            ],
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Costo actualizado" },
                404: { description: "Obra no encontrada" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public deleteObraSql = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar obra (Sql)",
            operationId: "deleteObraSql",
            parameters: [
                {
                    name: "obr_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra",
                    default:"0000000721"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{obr_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Obra eliminada" },
                404: { description: "Obra no encontrada" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };
}
