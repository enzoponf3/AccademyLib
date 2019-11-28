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
		references Book(Id) on delete cascade,
	constraint FK_GenG foreign key (GenId)
		references Genre(Id) on delete cascade
);


create table Book_Auth
(
	Id int primary key identity (1,1),
	BookId int not null,
	AuthId int not null,
	constraint UQ_Book_Auth unique (BookId, AuthId),
	constraint FK_BookA foreign key (BookId)
		references Book(Id) on delete cascade,
	constraint FK_AuthG foreign key (AuthId)
		references Author(Id) on delete cascade

);

create table Book_Pub
(
	Id int primary key identity (1,1),
	BookId int not null,
	PubId int not null,
	constraint UQ_Book_Pub unique (BookId, PubId),
	constraint FK_BookP foreign key (BookId)
		references Book(Id) on delete cascade,
	constraint FK_AuthP foreign key (PubId)
		references Publisher(Id) on delete cascade
)

insert into Author
([Name], Nationality)
values
('J. K. Rowling','GBR'),
('Issac Asimov','RUS'),
('Jhon Green','USA')

insert into Publisher
([Name])
values
('Bloomsbury Publishing'),
('Bantam Spectra Books'),
('Dutton')

insert into Genre
([Name],[Description])
values
('Novel','A novel is a relatively long work of narrative fiction, normally written in prose form, and which is typically published as a book.'),
('Adventure','An adventure is an event or series of events that happens outside the course of the protagonist''s ordinary life, usually accompanied by danger, often by physical action.'),
('Science Fiction','Science fiction (sometimes called sci-fi or simply SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.')

select * from Genre;
select * from Author;
select * from Publisher;

























