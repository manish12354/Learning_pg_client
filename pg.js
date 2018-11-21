const { Client } = require('pg');
const defaultCs = 'postgres://localhost:5432/manishy';
const connectionString = process.env.DATABASE_URL||defaultCs;

const client = new Client({
     user: 'manishy',
     database: 'manishy',
     port: 5432,
     host: 'localhost',
     password: null,
     binary: false,
     ssl: false,
     client_encoding: '',
     replication: undefined,
     isDomainSocket: false,
     application_name: undefined,
     fallback_application_name: undefined,
     statement_timeout: false }
   );

// let client = new Client({connectionString});
// console.log(client);

const query = {
  text:
  "DROP SCHEMA IF EXISTS step_library cascade;"
  +"CREATE SCHEMA step_library;"
  +"SET search_path to step_library;"
  +"DROP TABLE IF EXISTS users;"
  +"CREATE TABLE users"
  +"(user_id varchar(254) primary key,"
  +"name varchar(40) not null,"
  +"contact_no numeric(12) not null check (contact_no>=10),"
  +"password varchar(20) not null check (length(ltrim(rtrim(password)))>=8));"


  +"DROP TABLE IF EXISTS book_details;"
  +"CREATE TABLE book_details"
  +"(isbn varchar(13) primary key check(length(isbn)=10 or length(isbn)=13),"
  +"title varchar(100) not null unique,"
  +"publisher varchar(40) not null,"
  +"available_from date not null,"
  +"no_of_pages numeric(5) check(no_of_pages >10),"
  +"description varchar(200) default 'No description available');"

  +"DROP TABLE IF EXISTS books;"
  +"CREATE TABLE books"
  +"(book_id varchar(6) primary key,"
  +"isbn  varchar(13) references book_details(isbn) not null,"
  +"status varchar(15) not null default 'Available' check(status in ('Available','Missing','Not Available')));"

  +"DROP TABLE IF EXISTS borrowed_books;"
  +"CREATE TABLE borrowed_books"
  +"(transaction_id serial primary key,"
  +"book_id varchar(6) references books(book_id)  not null,"
  +"user_id varchar(254) references users(user_id) not null,"
  +"issue_date date not null,"
  +"return_date date);"


  +"DROP TABLE IF EXISTS author;"
  +"CREATE TABLE author"
  +"(author_id serial primary key,"
	+"author_name varchar(30) not null unique);"


  +"DROP TABLE IF EXISTS books_by_author;"
  +"CREATE TABLE books_by_author"
  +"(id serial primary key,"
	+"author_id integer references author(author_id) not null,"
	+"isbn varchar(13) references book_details(isbn) not null);"

  +"CREATE TABLE missing_books"
  +"(missing_id serial primary key,"
 	+"book_id varchar(6) references books(book_id) not null unique,"
 	+"missing date not null);"




   +"set search_path to step_library;"

/* Inserting data into users table */

   +"insert into users values('rahulp@thoughtworks.com','Rahul',9657096290,'rahul123'),"
   +"('harshadt@thoughtworks.com','Harshad',9922311499,'harshad12'),"
   +"('manishy@thoughtworks.com','Manish',8423709732,'manish23'),"
   +"('madhurk@thoughtworks.com','Madhuri',7892296764,'madhuri13'),"
   +"('anjumk@thoughtworks.com','Anjum',9148405315,'anjum543'),"
   +"('omkarm@thoughtworks.com','Omkar',9657096290,'omkar123'),"
   +"('ketans@thoughtworks.com','Ketan',9922311499,'ketans123'),"
   +"('shubhamj@thoughtworks.com','Shubham',8423709732,'shubham12'),"
   +"('yogirajt@thoughtworks.com','Yogiraj',7892296764,'yogiraj1'),"
   +"('suyogu@thoughtworks.com','Suyog',9148405315,'suyog543');"


/* Inserting data into book_details */

  +"insert into book_details values(9780007525980,'Game Of Throne','HarperCollins','2017-12-30',801),"
  +"(9780743468596,'First Things First','FranklinCovey','2017-05-30',370),"
  +"(8172866160,'Conversational Kannada','Prism','2017-07-17',430),"
  +"(9788120334236,'Indian Models of Economy,Business and Management','phindia','2017-09-23',318),"
  +"(1743287932,'The 8th Habit','FrrePress','2017-05-01',432),"
  +"(1553108034,'A Clash Of Kings','Voyagar','2017-05-01',768),"
  +"(8176563587,'Pointers In C','BPB','2017-06-01',539),"
  +"(9788131786826,'Agile Analytics','Pearson','2017-06-01',330),"
  +"(9788131724422,'Refactoring Improving The Design Of Existing Code','Pearson','2017-06-01',431),"
  +"(9780486478739,'The Return Of Sherlock Holmes','Dover','2017-08-15',256),"
  +"(9780553328257,'The Complete Sherlock Holmes','Bantam Classics','2017-06-01',1796);"

/* Inserting data into books */

  +"insert into books values('1-1',9780007525980),"
  +"('1-2',9780007525980),"
  +"('1-3',9780007525980),"
  +"('2-1',9780743468596),"
  +"('2-2',9780743468596),"
  +"('3-1',8172866160),"
  +"('4-1',9788120334236),"
  +"('4-2',9788120334236),"
  +"('4-3',9788120334236),"
  +"('4-4',9788120334236),"
  +"('5-1',1743287932),"
  +"('5-2',1743287932),"
  +"('5-3',1743287932),"
  +"('5-4',1743287932),"
  +"('5-5',1743287932),"
  +"('5-6',1743287932),"
  +"('5-7',1743287932),"
  +"('5-8',1743287932),"
  +"('5-9',1743287932),"
  +"('5-10',1743287932),"
  +"('5-11',1743287932),"
  +"('6-1',1553108034),"
  +"('6-2',1553108034),"
  +"('6-3',1553108034),"
  +"('6-4',1553108034),"
  +"('6-5',1553108034),"
  +"('6-6',1553108034),"
  +"('6-7',1553108034),"
  +"('6-8',1553108034),"
  +"('6-9',1553108034),"
  +"('6-10',1553108034),"
  +"('6-11',1553108034),"
  +"('7-1',8176563587),"
  +"('7-2',8176563587),"
  +"('7-3',8176563587),"
  +"('8-1',9788131786826),"
  +"('8-2',9788131786826),"
  +"('8-3',9788131786826),"
  +"('8-4',9788131786826),"
  +"('8-5',9788131786826),"
  +"('9-1',9788131724422),"
  +"('9-2',9788131724422),"
  +"('10-1',9780486478739),"
  +"('10-2',9780486478739),"
  +"('11-1',9780553328257),"
  +"('11-2',9780553328257),"
  +"('11-3',9780553328257),"
  +"('11-4',9780553328257),"
  +"('11-5',9780553328257),"
  +"('11-6',9780553328257),"
  +"('11-7',9780553328257),"
  +"('11-8',9780553328257),"
  +"('11-9',9780553328257),"
  +"('11-10',9780553328257),"
  +"('11-11',9780553328257);"

/* Inserting data into authors */

  +"insert into author (author_name) values('Stephen R. Covey'),"
  +"('A. Roger Merrill'),"
  +"('Rebecca R. Merrill'),"
  +"('George R. R. Martin'),"
  +"('N. D. Krishnamurthy'),"
  +"('Dr. U. P. Upadhyaya'),"
  +"('P. Kanagasabapathi'),"
  +"('Kent Beck'),"
  +"('John Brant'),"
  +"('William Opdyke'),"
  +"('Don Roberts'),"
  +"('Ken Collier'),"
  +"('Yashavant Kanetkar'),"
  +"('Sir Arthur Conan Doyle');"

/* Inserting data into books_by_author */

  +"insert into books_by_author (author_id,isbn) values(1,9780743468596),"
  +"(1,1743287932),"
  +"(2,9780743468596),"
  +"(3,9780743468596),"
  +"(4,9780007525980),"
  +"(4,1553108034),"
  +"(5,8172866160),"
  +"(6,8172866160),"
  +"(7,9788120334236),"
  +"(8,9788131724422),"
  +"(9,9788131724422),"
  +"(10,9788131724422),"
  +"(11,9788131724422),"
  +"(12,9788131786826),"
  +"(13,8176563587),"
  +"(14,9780486478739),"
  +"(14,9780553328257);"

/* inserting data into borrowed_books */
/* borrowed and returned to*/
  +"insert into borrowed_books (book_id,user_id,issue_date,return_date) values ('6-1','rahulp@thoughtworks.com','2017-05-03','2017-05-13'),"
  +"('7-1','harshadt@thoughtworks.com','2017-05-04','2017-05-13'),"
  +"('8-1','manishy@thoughtworks.com','2017-05-05','2017-05-15'),"
  +"('9-1','madhurk@thoughtworks.com','2017-05-06','2017-05-14'),"
  +"('6-2','anjumk@thoughtworks.com','2017-05-07','2017-05-12'),"
  +"('7-1','rahulp@thoughtworks.com','2017-09-03','2017-09-13'),"
  +"('8-1','harshadt@thoughtworks.com','2017-09-04','2017-09-13'),"
  +"('9-1','manishy@thoughtworks.com','2017-09-05','2017-09-15'),"
  +"('5-1','madhurk@thoughtworks.com','2017-09-06','2017-09-14'),"
  +"('4-2','anjumk@thoughtworks.com','2017-09-07','2017-09-12'),"
  +"('3-1','omkarm@thoughtworks.com','2017-09-08','2017-09-17'),"
  +"('2-1','ketans@thoughtworks.com','2017-09-09','2017-09-18'),"
  +"('7-2','shubhamj@thoughtworks.com','2017-09-10','2017-09-19'),"
  +"('7-3','yogirajt@thoughtworks.com','2017-09-11','2017-09-20'),"
  +"('8-2','suyogu@thoughtworks.com','2017-09-12','2017-09-30'),"
  +"('8-1','rahulp@thoughtworks.com','2017-09-03','2017-09-13'),"
  +"('9-1','harshadt@thoughtworks.com','2017-09-04','2017-09-13'),"
  +"('1-1','manishy@thoughtworks.com','2017-09-05','2017-09-15'),"
  +"('1-2','madhurk@thoughtworks.com','2017-09-06','2017-09-14'),"
  +"('2-2','anjumk@thoughtworks.com','2017-09-07','2017-09-12'),"
  +"('3-1','omkarm@thoughtworks.com','2017-09-08','2017-09-17'),"
  +"('4-1','ketans@thoughtworks.com','2017-09-09','2017-09-18'),"
  +"('5-2','shubhamj@thoughtworks.com','2017-09-10','2017-09-19'),"
  +"('6-3','yogirajt@thoughtworks.com','2017-09-11','2017-09-20'),"
  +"('7-2','suyogu@thoughtworks.com','2017-09-12','2017-09-30'),"
  +"('3-1','rahulp@thoughtworks.com','2018-01-01','2018-01-30'),"
  +"('2-2','rahulp@thoughtworks.com','2018-01-04','2018-01-21');"

/* borrowed but not returned */

  +"insert into borrowed_books (book_id,user_id,issue_date) values('1-1','rahulp@thoughtworks.com','2018-03-01');"
  +"update books set status = 'Not Available' where book_id = '1-1';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('2-1','rahulp@thoughtworks.com','2018-02-21');"
  +"update books set status = 'Not Available' where book_id = '2-1';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('1-2','madhurk@thoughtworks.com','2018-02-01');"
  +"update books set status = 'Not Available' where book_id = '1-2';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('2-2','madhurk@thoughtworks.com','2018-02-01');"
  +"update books set status = 'Not Available' where book_id = '2-2';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('4-1','rahulp@thoughtworks.com','2018-02-21');"
  +"update books set status = 'Not Available' where book_id = '4-1';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('4-2','madhurk@thoughtworks.com','2018-02-01');"
  +"update books set status = 'Not Available' where book_id = '4-2';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('7-2','harshadt@thoughtworks.com','2018-02-01');"
  +"update books set status = 'Not Available' where book_id = '7-2';"

  +"insert into borrowed_books (book_id,user_id,issue_date) values('1-3','omkarm@thoughtworks.com','2018-02-01');"
  +"update books set status = 'Not Available' where book_id = '1-3';"



  +"SELECT * FROM users;"
  +"SELECT * FROM book_details;"
  +"SELECT * FROM books;"
  +"SELECT * FROM borrowed_books;"
  +"SELECT * FROM author;"
  +"SELECT * FROM books_by_author;"
  +"SELECT * FROM missing_books;"


  // ,values: ['brianc', 'brian.m.carlson@gmail.com']
}


let dummyQuery = {
  text:
  "SET search_path to step_library;"
  +"SELECT * FROM users;"
  +"SELECT * FROM book_details;"
  +"SELECT * FROM books;"
  +"SELECT * FROM borrowed_books;"
  +"SELECT * FROM author;"
  +"SELECT * FROM books_by_author;"
  +"SELECT * FROM missing_books;"
}

client.connect();
client.query(query, (err, res) => {
  let selectQueryResult;
  if (err) {
    console.log(err.stack)
  } else {
    selectQueryResult = res.filter((response)=>{
      return response.command=="SELECT";
    }).map((element=>{return element.rows}))
    for (var i = 0; i < selectQueryResult.length; i++) {
      let element = selectQueryResult[i];

      console.log("==================================================\n==================================================\n\n");
      for (var i1 = 0; i1 < element.length; i1++) {
        console.log(element[i1]);;
      }
    }
    // console.log(client);
  }
  client.end();
})
