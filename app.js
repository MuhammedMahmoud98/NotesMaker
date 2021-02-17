const yargs = require('yargs');
const notes = require('./notes.js');


yargs.command({
    command: 'add',
    describe: 'Add a note with (title, body) arguments',
    builder: {
      title : {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      },
      body: {
          describe: 'Note body',
          demandOption: true,
          type: 'string'
      }
    },
    handler: (argv) => {
        const {title, body} = argv;
        notes.addNote(title, body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note, with (title) argument',
    builder: {
        title: {
            describe: 'remove note with title name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list-my-notes',
    describe: 'Showing up my existing notes',
    handler: () => {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a List',
    handler: () => {
        console.log(notes.loadNotes());
    }
});


yargs.command({
   command: 'open',
   describe: 'open selected note with (title) argument',
    builder: {
        title: {
            describe: 'select note with (title)',
            demandOption: true,
            type: 'string'
        }
    },
   handler: (argv) => {
       console.log(notes.openNote(argv.title));
   }
});

// for parsing cli commands
yargs.parse()