using {com.padron as padron} from '../db/padron';

define service PadronSrv {
@odata.singleton
 entity ExcelUpload {
        @Core.MediaType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

 entity Padron as projection on padron.Padron
}