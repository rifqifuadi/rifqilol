#!/usr/bin/env node

var fileSys = require('fs'),
    format = '.mp3',
    files_organized = 0,
    files_ignored = 0,
    folders_created = 0;

fileSys.readdir(process.cwd(), function (err, files) {

  // if error then shout out!
  if (err) { console.log(err); return false; }

  // find files only.
  for(idx in files){

    // get the file name.
    var file = files[idx];

    // if not a directory.
    if(!fileSys.lstatSync(file).isDirectory()){

      // get the position of the extension (format)
      var format_pos = file.lastIndexOf(format);

      // if extension found
      if(format_pos > 0){

        // get the artist
        var dash = file.indexOf('-'),
        artist = file.substring(0, format_pos).substring(0,dash).trim();

        if(artist.length){

          // check if the folder exists
          if(!fileSys.existsSync(artist)){
            fileSys.mkdirSync(artist);
            folders_created++;
          }

          // move the file
          fileSys.renameSync(file, artist+'/'+file);
          files_organized++;

        }else{

          files_ignored++;

        }

      } // if format_pos

    } // if .isDirectory()

  } // for idx in files

  console.log('Tololoche has organized ' + files_organized + ' files, ignored '+files_ignored+' and created ' + folders_created + ' folders.');

}); // eof readdir