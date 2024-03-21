import dayjs from 'dayjs';

function Film(id, title, pId, favourite = false, date, rating) {
    this.id = id;
    this.title = title;
    this.pId = pId;
    this.favourite = favourite;
    this.date = date && dayjs(date);
    this.rating = rating;

    this.toString = () => {
        return "" + this.id + ", " + this.title + " " + this.pId + ", " +
            (this.favourite ? "favourite" : "not a favourite")  + ", "
            + (this.date ? this.date.format("DD/MM/YYYY") : "no date")+ ", "
            + (this.rating ? this.rating : "no rating");

    }
}


function FilmLibrary() {
    this.array = [];

    this.addNewFilm = (film) => {
        this.array.push(film);
    }
    // this.deleteFilm = (id) => {
    //     this.array = this.array.filter(value => value.id!==id);
    //     // this.array.splice(id, 1);
    // }
    this.deleteFilm = (id) => {
        this.array = this.array.filter(function (film, index, arr) {
            return film.id !== id;
        });
    }
    this.sortByDate = () => {
        return [...this.array].sort((a, b) => {
            // b.date ? -1 : a.date ? -1 : a.date.isAfter(b.date) ? 1 : -1);
            if (!b.date) return -1;
            else if (!a.date) return 1;
            // else return a.date.isAfter(b.date) ? 1 : -1;
            return dayjs(a.date).isAfter(b.date) ? 1 : -1;
        });
    }

    this.resetWatchedFilms = () => {
        this.array.forEach(value => value.date = undefined);
    }
    this.getRated = () => {
        return [...this.array].filter(value => value.rating != null)
    }
    this.print = () => {
        console.log("***** List of films *****");
        this.array.forEach((item) => console.log(item.toString()));
    }
}

const PulpF = new Film("01", "Pulp Fiction", "01");
const Shrek = new Film("02", "Shrek", "01", true, "2024-03-11", 5);
const Shrek2 = new Film("03", "Shrek2", "01", true, "2022-03-11", 5);

const library = new FilmLibrary();
library.addNewFilm(PulpF);
library.addNewFilm(Shrek2);
library.addNewFilm(Shrek);

library.array.forEach(e => console.log(typeof e.date));
library.sortByDate().forEach(e => console.log(e.toString()));
console.log("\n")
library.getRated().forEach(e => console.log(e.toString()));
console.log("\n")
library.resetWatchedFilms();
library.deleteFilm("01");

library.print();
// console.log(library.array)

