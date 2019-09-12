const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    const existingNote = notes.find(note => note.title === title);

    if(!existingNote){    
        const note = {
            title: title,
            body: body
        }
        notes.push(note);
        updateJSON(notes);
        console.log(chalk.green('I added a new note!'));
    }
    else{
        console.log(chalk.bold.red.bgWhite('Hey! That note already exists!'));
    }   

}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);

    if(notes.length === updatedNotes.length){
        console.log(chalk.red('That note does not exist.'));
    }
    else{
        console.log(chalk.green('Item succesfully removed: '+title));
        updateJSON(updatedNotes);
    } 
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse(`${notes.length} Notes`));
    notes.forEach(note => {
        console.log(chalk.yellow(`\n${note.title}`));
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if(note){
        console.log(chalk.green.inverse('Found the note!'));
        console.log(chalk.yellow(`\n${note.title}`));
        console.log(note.body)
    }
    else{
        console.log(chalk.red.bold('Note does not exist!'));
    }
}

const updateJSON = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = JSON.parse(dataBuffer.toString());
        return dataJSON;
    } catch(e){
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};