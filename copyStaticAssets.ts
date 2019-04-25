import shell from "shelljs";

shell.cp("-R", "src/app/views", "dist/app/views/");
shell.cp("src/app/swagger.json", "dist/app/swagger.json");
shell.rm("-rf", "dist/tests");
