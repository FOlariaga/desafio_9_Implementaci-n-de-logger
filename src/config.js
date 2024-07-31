import * as url from 'url';
// import path from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';

const commandLine = new Command();
commandLine
    .option('--mode <mode>')
    .option('--port <port>')
    .option('--setup <number>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config({ path: clOptions.mode === 'devel' ? '.env.devel' : '.env.prod' });

const config = {
    SERVER: "atlas",
    PORT: process.env.PORT || clOptions.port || 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET: process.env.SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL : process.env.GITHUB_CALLBACK_URL,
    PERSISTENCE: process.env.PERSISTENCE || "mongo",
    MODE : clOptions.mode === 'devel' ? 'dev' : 'prod'
}

export default config;