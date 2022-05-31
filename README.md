#Next.js OpenJira App

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
*El -d, significa _detached_

#MongoDB URL Local:
```
mongodb://localhost:27017/
```

#Configurar las variables de entorno
Renombrar el archivo _.env.template __a__ a .env

## Llenar la base de datos con informacion de pruebas

#call
```
    http://localhost:3000/api/seed
```