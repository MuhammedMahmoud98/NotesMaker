const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    try {
        const notes = loadNotes();
        const isDuplicatedNote = notes.some(note => note.title === title);

        if (isDuplicatedNote) {
            console.log(chalk.yellow('Duplicated note, please add new one'));
        } else {
            notes.push({
                title,
                body
            });
            saveNotes(notes);
            console.log(chalk.green('Note added successfully'));
        }
    } catch {
        console.log('Missing Argument');
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const removeNote = (noteTitle) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== noteTitle);
    if (filteredNotes.length === notes.length) {
        console.log(chalk.red(`'${noteTitle}' does not exist`));
    } else {
        saveNotes(filteredNotes);
        console.log(chalk.green('Note removed successfully'));
    }
}

const loadNotes = () => {
    try {
        const readNotes = fs.readFileSync('notes.json').toString();
        return JSON.parse(readNotes);
    } catch (e) {
        return [];
    }
}

const listNotes = () => {
    const readNotes = loadNotes();
    console.log(chalk.green('My Notes: \n'));
    readNotes.forEach((note, index) => {
        let noteData = `${index + 1}- ${note.title}`;
        console.log(noteData);
    })
}

const openNote = (noteTitle) => {
    try {
        const readNotes = loadNotes();

        const filteredNote = readNotes.filter(note => note.title === noteTitle)[0];
        const {title, body} = filteredNote;
        return `${chalk.green(title)}: \n${body}`;
    } catch {
        console.log(chalk.red(`note with title '${noteTitle}' doesn't exist`));
    }
}
module.exports = {
    loadNotes,
    addNote,
    removeNote,
    listNotes,
    openNote
};