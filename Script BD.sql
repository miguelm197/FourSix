

CREATE DATABASE FourSix
GO

USE FourSix




CREATE TABLE EMPRESA (
    Id              BIGINT          NOT NULL    IDENTITY(1,1)  PRIMARY KEY  ,
    Rut             VARCHAR(12)     NOT NULL                                ,
    RazonSocial     VARCHAR(50)     NOT NULL                                ,
    Direccion       VARCHAR(50)     NOT NULL                                ,
    Departamento    VARCHAR(50)     NOT NULL                                ,
    Ciudad          VARCHAR(50)     NOT NULL                                ,
    Borrado         BIT     NOT     NULL                                    ,

);  




CREATE TABLE ROL (
    Id              INT			    NOT NULL                   PRIMARY KEY  ,
    Nombre			VARCHAR(50)		NOT NULL								,
	Descripcion		VARCHAR(100)	NULL									,
	Borrado			BIT				NOT NULL								
);  




CREATE TABLE TIPO_PRENDA (
    Id              INT			    NOT NULL                   PRIMARY KEY  ,
    Nombre			VARCHAR(50)		NOT NULL								,
    Descripcion		VARCHAR(100)	NULL									,
    Estado			VARCHAR(50)		NOT NULL								,
    Borrado			BIT				NOT NULL								
);  




CREATE TABLE ESTADO (
    Id              INT			    NOT NULL                   PRIMARY KEY  ,
    Nombre			VARCHAR(50)		NOT NULL								,
    Descripcion		VARCHAR(100)	NULL									,
    Borrado			BIT				NOT NULL								
);  




CREATE TABLE PERSONA (
    Id              BIGINT			NOT NULL    IDENTITY(1,1)  PRIMARY KEY  ,
    Nombre			VARCHAR(50)		NOT NULL								,
	Apellido		VARCHAR(50)		NOT NULL								,
	IdEmpresa		BIGINT			NULL									,
	Email			VARCHAR(50)		NULL									,
	Telefono		INT				NULL									,
	Celular			INT				NULL									,
	Notas			VARCHAR(100)	NULL									,
	Borrado			BIT				NOT NULL								
); 

ALTER TABLE PERSONA WITH CHECK ADD CONSTRAINT FK_PERSONA_EMPRESA FOREIGN KEY(IdEmpresa)
REFERENCES EMPRESA (Id)  




CREATE TABLE USUARIO (
	IdPersona       BIGINT			NOT NULL				   PRIMARY KEY  ,
	Usuario			VARCHAR(50)		NOT NULL								,
	IdRol			INT				NULL									,
	Contrasena		VARCHAR(100)	NOT NULL								,
	Habilitado		BIT				NOT NULL								,
	Borrado			BIT				NOT NULL								,
); 

ALTER TABLE USUARIO WITH CHECK ADD CONSTRAINT FK_USUARIO_PERSONA FOREIGN KEY(IdPersona)
REFERENCES PERSONA (Id)  

ALTER TABLE USUARIO WITH CHECK ADD CONSTRAINT FK_USUARIO_ROL FOREIGN KEY(IdRol)
REFERENCES ROL (Id)  




CREATE TABLE PROVEEDOR (
	IdPersona       BIGINT			NOT NULL				   PRIMARY KEY  ,
	Codi 			INT				NULL									,
	Nota			VARCHAR(100)	NULL									,
	Borrado			BIT				NOT NULL								,
); 

ALTER TABLE PROVEEDOR WITH CHECK ADD CONSTRAINT FK_PROVEEDOR_PERSONA FOREIGN KEY(IdPersona)
REFERENCES PERSONA (Id)  




CREATE TABLE CLIENTE (
	IdPersona       BIGINT			NOT NULL				   PRIMARY KEY  ,
	Nota			VARCHAR(100)	NULL									,
	Borrado			BIT				NOT NULL								,
); 

ALTER TABLE CLIENTE WITH CHECK ADD CONSTRAINT FK_CLIENTE_PERSONA FOREIGN KEY(IdPersona)
REFERENCES PERSONA (Id)  




CREATE TABLE ITEMS (
	Id				BIGINT			NOT NULL				   PRIMARY KEY  ,
	Codi 			VARCHAR(50)		NULL									,
	Nombre			VARCHAR(50)		NOT NULL								,
	Descripcion		VARCHAR(200)	NULL									,
	IdProveedor		BIGINT			NOT NULL								,
	Costo			DECIMAL			NOT NULL								,
	MontoVenta		DECIMAL			NOT NULL								,
	Stock			INT				NOT NULL								,
	IdTipoPrenda	INT				NOT NULL								,
	Talle			VARCHAR(50)		NULL									,
	IdEstado		INT				NULL									,
	Borrado			BIT				NOT NULL								
); 

ALTER TABLE ITEMS WITH CHECK ADD CONSTRAINT FK_ITEMS_PROVEEDOR FOREIGN KEY(IdProveedor)
REFERENCES PROVEEDOR (IdPersona)  

ALTER TABLE ITEMS WITH CHECK ADD CONSTRAINT FK_ITEMS_TIPO_PRENDA FOREIGN KEY(IdTipoPrenda)
REFERENCES TIPO_PRENDA (Id)  

ALTER TABLE ITEMS WITH CHECK ADD CONSTRAINT FK_ITEMS_ESTADO FOREIGN KEY(IdEstado)
REFERENCES ESTADO (Id)  




CREATE TABLE VENTA (
	Id				BIGINT			NOT NULL				   PRIMARY KEY  ,
	CodigoVenta		VARCHAR(50)		NULL									,
	NroBoleta		VARCHAR(50)		NULL									,
	Fecha			DATE			NOT NULL								,
	MontoFinal		INT				NOT NULL								,
	MontoDescuento	INT				NOT NULL								,
	FormaPago		VARCHAR(50)		NULL									,
	IdCliente		BIGINT			NOT NULL								,
	IdUsuario		BIGINT			NOT NULL								,
	Notas			VARCHAR(200)	NULL									,
	Borrado			BIT				NOT NULL								
); 

ALTER TABLE VENTA WITH CHECK ADD CONSTRAINT FK_VENTA_CLIENTE FOREIGN KEY(IdCliente)
REFERENCES CLIENTE (IdPersona)

ALTER TABLE VENTA WITH CHECK ADD CONSTRAINT FK_VENTA_USUARIO FOREIGN KEY(IdUsuario)
REFERENCES USUARIO (IdPersona)




CREATE TABLE VENTA_ITEM (
	IdVenta			BIGINT			NOT NULL								,
	IdItem			BIGINT			NOT NULL								
	
	PRIMARY KEY (IdVenta, IdItem) 
); 

ALTER TABLE VENTA_ITEM WITH CHECK ADD CONSTRAINT FK_VENTA_ITEM_VENTA FOREIGN KEY(IdVenta)
REFERENCES VENTA (Id)

ALTER TABLE VENTA_ITEM WITH CHECK ADD CONSTRAINT FK_VENTA_ITEM_ITEM FOREIGN KEY(IdItem)
REFERENCES ITEMS (Id)


GO
INSERT INTO ROL VALUES (1, 'Administrador', 'Administrador', 0);