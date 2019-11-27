create database AccademyLibrary;
go

use AccademyLibrary;
go

create table Author
(
	Id int primary key identity (1,1),
	[Name] varchar (100) not null,
	Nationality varchar (3) not null,
	constraint UQ_AName unique ([Name])
);


create table Publisher
(
	Id int primary key identity (1,1),
	[Name] varchar (100) not null,
	constraint UQ_PName unique ([Name])
);



create table Book
(
	Id int primary key identity (1,1),
	Title varchar (100) not null,
	Subtitle varchar (100),
	ISBN varchar (13) not null,
	constraint UQ_ISBN unique (ISBN)
);


create table Genre
(
	Id int primary key identity (1,1),
	[Name] varchar (100) not null,
	[Description] varchar (500) not null,
	constraint UQ_GName unique ([Name])
);

create table Book_Gen
(
	Id int primary key identity (1,1),
	BookId int not null,
	GenId int not null,
	constraint UQ_Book_Gen unique (BookId, GenId),
	constraint FK_BookG foreign key (BookId)
		references Book(Id),
	constraint FK_GenG foreign key (GenId)
		references Genre(Id)
);


create table Book_Auth
(
	Id int primary key identity (1,1),
	BookId int not null,
	AuthId int not null,
	constraint UQ_Book_Auth unique (BookId, AuthId),
	constraint FK_BookA foreign key (BookId)
		references Book(Id),
	constraint FK_AuthG foreign key (AuthId)
		references Author(Id)

);

create table Book_Pub
(
	Id int primary key identity (1,1),
	BookId int not null,
	PubId int not null,
	constraint UQ_Book_Pub unique (BookId, PubId),
	constraint FK_BookP foreign key (BookId)
		references Book(Id),
	constraint FK_AuthP foreign key (PubId)
		references Publisher(Id)
)

