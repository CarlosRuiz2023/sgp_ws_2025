export class SwaggerCooperadorController {
    tag: any = {
        name: "cooperadores",
        description: "Operaciones relacionadas con los cooperadores (Access y SQL)"
    };

    public getCooperadoresAccess = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener cooperador(es) por clave (Access)",
            operationId: "getCooperadoresAccess",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra o cooperador",
                    default:"0000000013"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador(es) encontrado(s)" },
                404: { description: "Cooperador(es) no encontrado(s)" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public postCooperadorAccess = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar un nuevo cooperador (Access)",
            operationId: "postCooperadorAccess",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros de la obra",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            coo_clv: {
                                type: "string",
                                description: "Clave del cooperador",
                                default:"0000000372999"
                            },
                            coo_pat: {
                                type: "string",
                                description: "Apellido paterno del cooperador",
                                default:"RUIZ"
                            },
                            coo_mat: {
                                type: "string",
                                description: "Apellido materno del cooperador",
                                default:"GOMEZ"
                            },
                            coo_nom: {
                                type: "string",
                                description: "Nombre(s) del cooperador",
                                default:"JUAN CARLOS"
                            },
                            coo_num: {
                                type: "string",
                                description: "Numero oficial del cooperador",
                                default:"219A"
                            },
                            coo_call: {
                                type: "string",
                                description: "Calle del cooperador",
                                default:"JARDIN DE BILBAO"
                            },
                            coo_col: {
                                type: "string",
                                description: "Colonia del cooperador",
                                default:"JARDINES DE SAN JUAN"
                            },
                            coo_cp: {
                                type: "string",
                                description: "Codigo postal del cooperador",
                                default:"37295"
                            },
                            coo_tel: {
                                type: "string",
                                description: "Numero telefonico del cooperador",
                                default:"4771234567"
                            },
                            coo_npag: {
                                type: "integer",
                                description: "Numero de pagos del cooperador",
                                default:18
                            },
                            coo_venc1: {
                                type: "string",
                                description: "Fecha de vencimiento para el cooperador",
                                default:"03/04/2025"
                            },
                            coo_mts: {
                                type: "double",
                                description: "Metros de frente del cooperador",
                                default:"8.1"
                            },
                            coo_pred: {
                                type: "string",
                                description: "CUenta predial del cooperador",
                                default: "01BC04858021"
                            }
                        },
                        required: ["coo_clv","coo_pat","coo_mat","coo_nom","coo_num","coo_call","coo_col","coo_cp","coo_tel","coo_npag","coo_venc1","coo_mts","coo_pred"]
                    }
                }
            ],
            responses: {
                201: { description: "Cooperador creado exitosamente" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putCooperadorAccess = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar cooperador (Access)",
            operationId: "putCooperadorAccess",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única del cooperador",
                    default:"0000000372999"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados de la obra",
                    required: true,
                    schema: {
                        properties: {
                            coo_pat: {
                                type: "string",
                                description: "Apellido paterno del cooperador",
                                default:"RUIZ act 2"
                            },
                            coo_mat: {
                                type: "string",
                                description: "Apellido materno del cooperador",
                                default:"GOMEZ"
                            },
                            coo_nom: {
                                type: "string",
                                description: "Nombre(s) del cooperador",
                                default:"JUAN CARLOS"
                            },
                            coo_num: {
                                type: "string",
                                description: "Numero oficial del cooperador",
                                default:"219A"
                            },
                            coo_call: {
                                type: "string",
                                description: "Calle del cooperador",
                                default:"JARDIN DE BILBAO"
                            },
                            coo_col: {
                                type: "string",
                                description: "Colonia del cooperador",
                                default:"JARDINES DE SAN JUAN"
                            },
                            coo_cp: {
                                type: "string",
                                description: "Codigo postal del cooperador",
                                default:"37295"
                            },
                            coo_tel: {
                                type: "string",
                                description: "Numero telefonico del cooperador",
                                default:"4771234567"
                            },
                            coo_npag: {
                                type: "integer",
                                description: "Numero de pagos del cooperador",
                                default:18
                            },
                            coo_venc1: {
                                type: "string",
                                description: "Fecha de vencimiento para el cooperador",
                                default:"03/04/2025"
                            },
                            coo_mts: {
                                type: "double",
                                description: "Metros de frente del cooperador",
                                default:"8.1"
                            },
                            coo_pred: {
                                type: "string",
                                description: "CUenta predial del cooperador",
                                default: "01BC04858021"
                            }
                        },
                        required: ["coo_pat","coo_mat","coo_nom","coo_num","coo_call","coo_col","coo_cp","coo_tel","coo_npag","coo_venc1","coo_mts","coo_pred"]
                    }
                }
            ],
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador actualizado exitosamente" },
                404: { description: "Cooperador no encontrado" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public deleteCooperadorAccess = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar cooperador (Access)",
            operationId: "deleteCooperadorAccess",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única del cooperador",
                    default:"0000000372999"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador eliminado" },
                404: { description: "Cooperador no encontrado" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public getCooperadoresSql = {
        get: {
            tags: [this.tag.name],
            summary: "Obtener cooperador(es) por clave (Sql)",
            operationId: "getCooperadoresSql",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única de la obra o cooperador",
                    default:"0000000728999"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador encontrado" },
                404: { description: "Cooperador no encontrado" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public postCooperadorSql = {
        post: {
            tags: [this.tag.name],
            summary: "Agregar un nuevo cooperador (Sql)",
            operationId: "postCooperadorSql",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Parámetros del cooperador",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            coo_clv: {
                                type: "string",
                                description: "Clave del cooperador",
                                default:"0000000728998"
                            },
                            coo_pat: {
                                type: "string",
                                description: "Apellido paterno del cooperador",
                                default:"RUIZ"
                            },
                            coo_mat: {
                                type: "string",
                                description: "Apellido materno del cooperador",
                                default:"GOMEZ"
                            },
                            coo_nom: {
                                type: "string",
                                description: "Nombre(s) del cooperador",
                                default:"JUAN CARLOS"
                            },
                            coo_num: {
                                type: "string",
                                description: "Numero oficial del cooperador",
                                default:"219A"
                            },
                            coo_call: {
                                type: "string",
                                description: "Calle del cooperador",
                                default:"JARDIN DE BILBAO"
                            },
                            coo_col: {
                                type: "string",
                                description: "Colonia del cooperador",
                                default:"JARDINES DE SAN JUAN"
                            },
                            coo_cp: {
                                type: "string",
                                description: "Codigo postal del cooperador",
                                default:"37295"
                            },
                            coo_tel: {
                                type: "string",
                                description: "Numero telefonico del cooperador",
                                default:"4771234567"
                            },
                            coo_npag: {
                                type: "integer",
                                description: "Numero de pagos del cooperador",
                                default:18
                            },
                            coo_venc1: {
                                type: "string",
                                description: "Fecha de vencimiento para el cooperador",
                                default:"03/04/2025"
                            },
                            coo_mts: {
                                type: "double",
                                description: "Metros de frente del cooperador",
                                default:"8.1"
                            },
                            coo_pred: {
                                type: "string",
                                description: "CUenta predial del cooperador",
                                default: "01BC04858022"
                            }
                        },
                        required: ["coo_clv","coo_pat","coo_mat","coo_nom","coo_num","coo_call","coo_col","coo_cp","coo_tel","coo_npag","coo_venc1","coo_mts","coo_pred"]
                    }
                }
            ],
            responses: {
                201: { description: "Cooperador creado exitosamente" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public putCooperadorSql = {
        put: {
            tags: [this.tag.name],
            summary: "Actualizar cooperador (Sql)",
            operationId: "putCooperadorSql",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única del cooperador",
                    default:"0000000728999"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Datos actualizados del cooperador",
                    required: true,
                    schema: {
                        properties: {
                            coo_pat: {
                                type: "string",
                                description: "Apellido paterno del cooperador",
                                default:"RUIZ act 2"
                            },
                            coo_mat: {
                                type: "string",
                                description: "Apellido materno del cooperador",
                                default:"GOMEZ"
                            },
                            coo_nom: {
                                type: "string",
                                description: "Nombre(s) del cooperador",
                                default:"JUAN CARLOS"
                            },
                            coo_num: {
                                type: "string",
                                description: "Numero oficial del cooperador",
                                default:"219A"
                            },
                            coo_call: {
                                type: "string",
                                description: "Calle del cooperador",
                                default:"JARDIN DE BILBAO"
                            },
                            coo_col: {
                                type: "string",
                                description: "Colonia del cooperador",
                                default:"JARDINES DE SAN JUAN"
                            },
                            coo_cp: {
                                type: "string",
                                description: "Codigo postal del cooperador",
                                default:"37295"
                            },
                            coo_tel: {
                                type: "string",
                                description: "Numero telefonico del cooperador",
                                default:"4771234567"
                            },
                            coo_npag: {
                                type: "integer",
                                description: "Numero de pagos del cooperador",
                                default:18
                            },
                            coo_venc1: {
                                type: "string",
                                description: "Fecha de vencimiento para el cooperador",
                                default:"03/04/2025"
                            },
                            coo_mts: {
                                type: "double",
                                description: "Metros de frente del cooperador",
                                default:"8.1"
                            },
                            coo_pred: {
                                type: "string",
                                description: "CUenta predial del cooperador",
                                default: "01BC04858021"
                            }
                        },
                        required: ["coo_pat","coo_mat","coo_nom","coo_num","coo_call","coo_col","coo_cp","coo_tel","coo_npag","coo_venc1","coo_mts","coo_pred"]
                    }
                }
            ],
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador actualizado exitosamente" },
                404: { description: "Cooperador no encontrado" },
                400: { description: "Datos inválidos" },
                500: { description: "Error interno del servidor" }
            }
        }
    };

    public deleteCooperadorSql = {
        delete: {
            tags: [this.tag.name],
            summary: "Eliminar cooperador (Sql)",
            operationId: "deleteCooperadorSql",
            parameters: [
                {
                    name: "coo_clv",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Clave única del cooperador",
                    default:"0000000728999"
                }
            ],
            // Es importante que definas la ruta con el parámetro
            path: "/{coo_clv}",  // Agrega esta línea si es que usas una estructura de paths
            responses: {
                200: { description: "Cooperador eliminado" },
                404: { description: "Cooperador no encontrado" },
                400: { description: "Petición errónea" },
                500: { description: "Error interno del servidor" }
            }
        }
    };
}
