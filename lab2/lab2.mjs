import dayjs from 'dayjs';
import sqlite from 'sqlite3';

// import isToday from 'dayjs/plugin/isToday'
//
// dayjs.extend(isToday)

// Apertura database e creazione oggetto
const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

function Film(id, title, isFavorite = false, rating, watchDate, userId = 1) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.isFavorite = isFavorite;
    this.watchDate = watchDate && dayjs(watchDate);
    this.rating = rating;

    this.toString = () => {
        return "" + this.id + " " + this.title + " " + this.userId + " " +
            (this.isFavorite ? "isFavorite" : "not a isFavorite") + " "
            + (this.watchDate ? this.watchDate.format("DD/MM/YYYY") : "no watchDate") + " "
            + (this.rating ? this.rating : "no rating") + "\n";

    }
}


function FilmLibrary() {
    // this.array = [];

    this.getAllFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                resolve(this.sortByDate(films));
            })
        })
    }
    this.getAllFavourites=()=>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE isFavorite=1";
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                resolve(this.sortByDate(films));
            })
        })
    }
    this.getAllWatchedToday=()=>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchDate=?";
            db.all(sql,[dayjs().format("YYYY-MM-DD")],(err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                resolve(this.sortByDate(films));
            })
        })
    }

    this.getAllWatchedBeforeDate = (date)=>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql,(err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId))
                    .filter(value=> value.watchDate ? value.watchDate.isBefore(date) : false);
                resolve(this.sortByDate(films));
            })
        })
    }

    this.getGraterRating=(rating) =>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating>=?";
            db.all(sql,[rating],(err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                resolve(this.sortByDate(films));
            })
        })
    }

    this.getFilmByString=(name)=>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql,(err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId))
                    .filter(value=> value.title.toLowerCase().includes(name));
                resolve(this.sortByDate(films));
            })
        })
    }

    this.getAllRatedFilms=()=>{
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating>=0";
            db.all(sql,(err, rows) => {
                if (err) reject(err);
                const films = rows.map(row =>
                    new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId))
                    //.filter(value=> value.title.toLowerCase().includes(name));
                    .sort((a, b) => b.rating - a.rating);
                resolve(this.sortByDate(films));
            })
        })
    }

    this.sortByDate = (array) => {
        return [...array].sort((a, b) => {
            if (!b.watchDate) return -1;
            else if (!a.watchDate) return 1;
            return dayjs(a.watchDate).isAfter(b.watchDate) ? 1 : -1;
        });
    }
}

const library = new FilmLibrary();
// library.getAllWatchedBeforeDate(dayjs().format("YYYY-MM-DD")).then(e => console.log(e.toString()));
// library.getGraterRating(5).then(e => console.log(e.toString()));
// library.getFilmByString("a").then(e => console.log(e.toString()));
library.getAllRatedFilms().then(e => console.log(e.toString()));

