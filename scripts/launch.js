const os = require('os');
const {
    join
} = require('path');
const {
    echo,
    exec,
    rm
} = require('shelljs');
const chalk = require('chalk');
const clear = require('console-clear');
const pkg = require('../package');

const platform = os.platform();
const buildPath = join(__dirname, '..', 'build');

clear();
echo(chalk.blue(`Build started ...\n`));

rm('-rf', buildPath);
process.env.DEV === 'true' ? exec('npm run pack:dev'): exec('npm run pack:prod');

function launch() {
    clear();
    echo(chalk.blue('Launching app ...\n'));
}

if (platform == 'win32') {
    launch();
    exec(join(buildPath, `${pkg.name}-win.exe`));
} else if (platform == 'linux') {
    launch();
    exec(join(buildPath, `${pkg.name}-linux`));
} else {
    launch();
    exec(join(buildPath, `${pkg.name}-macos`));
}