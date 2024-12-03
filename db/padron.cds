namespace com.padron;


entity Padron  {
key     cuit: String; 
key     fecha_p : Date;
key     fecha_v: Date;
key     fecha_f: Date; 
     tipo: String(1); 
     alta: String(1);
     cambio: String(1); 
     qsatz_p : String; 
     qsatz_r : String; 
     grupo_p: String(2); 
     grupo_r: String(2);  
     razon_social: String(60)
}