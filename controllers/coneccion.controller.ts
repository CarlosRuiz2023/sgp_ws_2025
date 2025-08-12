import { dbPostgres } from "../config/db/connection";


export class ConeccionController {

  public async coneccionPostgreSQL() {
    const resp:any = await dbPostgres.query(`select 1+1 as resp;`);
    if(resp[0][0].resp==2){
      return "Coneccion a bd de SQL Server exitosa";
    }else{
      return "Problemas al establecer la coneccion a la bd de SQL Server";
    }
  }
}