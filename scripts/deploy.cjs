const { execSync } = require('child_process');
const SftpClient = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function deploy() {
  try {
    // 環境変数の確認
    const requiredEnvVars = [
      'SFTP_HOST',
      'SFTP_PORT',
      'SFTP_USER',
      'SFTP_PRIVATE_KEY_PATH',
      'SFTP_REMOTE_PATH'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Error: ${envVar} is not set in .env.local`);
        process.exit(1);
      }
    }

    // SFTP設定
    const config = {
      host: process.env.SFTP_HOST,
      port: parseInt(process.env.SFTP_PORT),
      username: process.env.SFTP_USER,
      privateKey: fs.readFileSync(process.env.SFTP_PRIVATE_KEY_PATH),
    };

    const remotePath = process.env.SFTP_REMOTE_PATH;
    const localPath = path.join(__dirname, '..', 'dist');

    // ビルド実行
    console.log('========================================');
    console.log('Building Vite project...');
    console.log('========================================');
    execSync('npm run build', { stdio: 'inherit' });

    // distディレクトリの確認
    if (!fs.existsSync(localPath)) {
      console.error(`Error: Build output directory not found: ${localPath}`);
      process.exit(1);
    }

    // SFTP接続とアップロード
    const sftp = new SftpClient();

    try {
      console.log('\n========================================');
      console.log('Connecting to SFTP server...');
      console.log(`Host: ${config.host}:${config.port}`);
      console.log(`User: ${config.username}`);
      console.log('========================================');

      await sftp.connect(config);
      console.log('Connected successfully!');

      console.log('\n========================================');
      console.log('Uploading files...');
      console.log(`Local:  ${localPath}`);
      console.log(`Remote: ${remotePath}`);
      console.log('========================================\n');

      await sftp.uploadDir(localPath, remotePath);

      console.log('\n========================================');
      console.log('Deploy completed successfully!');
      console.log(`Site should be available at: http://${config.host}/word-wolf`);
      console.log('========================================\n');

    } catch (error) {
      console.error('\n========================================');
      console.error('Deploy failed!');
      console.error('========================================');
      console.error('Error details:', error.message);
      process.exit(1);
    } finally {
      await sftp.end();
    }

  } catch (error) {
    console.error('\n========================================');
    console.error('Fatal error occurred!');
    console.error('========================================');
    console.error(error.message);
    process.exit(1);
  }
}

deploy();
