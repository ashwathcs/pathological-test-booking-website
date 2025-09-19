import { Octokit } from '@octokit/rest'
import { execSync } from 'child_process'
import fs from 'fs'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function publishToGitHub() {
  try {
    console.log('🚀 Starting GitHub publication process...');
    
    // Get GitHub client
    const octokit = await getUncachableGitHubClient();
    
    // Get user info
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`📝 Publishing to GitHub account: ${user.login}`);
    
    // Repository details
    const repoName = 'pathological-test-booking-website';
    const repoDescription = 'Professional pathological test booking website with home sample collection, real-time tracking, and secure digital reports. Built with React, Node.js, and engaging animations.';
    
    try {
      // Check if repository already exists
      const { data: existingRepo } = await octokit.rest.repos.get({
        owner: user.login,
        repo: repoName
      });
      console.log('📁 Repository already exists:', existingRepo.html_url);
      return existingRepo.html_url;
    } catch (error) {
      // Repository doesn't exist, create it
      console.log('📁 Creating new repository...');
    }
    
    // Create repository
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      private: false,
      auto_init: false,
    });
    
    console.log('✅ Repository created:', repo.html_url);
    
    // Initialize git if not already initialized
    try {
      execSync('git status', { stdio: 'ignore' });
      console.log('📦 Git already initialized');
    } catch {
      console.log('📦 Initializing git repository...');
      execSync('git init');
      execSync('git branch -M main');
    }
    
    // Create .gitignore if it doesn't exist
    if (!fs.existsSync('.gitignore')) {
      console.log('📝 Creating .gitignore...');
      const gitignore = `# Dependencies
node_modules/
/.pnp
.pnp.js

# Production builds
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Replit specific
.replit
replit.nix
.config/
.upm/

# Database
*.db
*.sqlite

# Logs
/tmp/logs/
`;
      fs.writeFileSync('.gitignore', gitignore);
    }
    
    // Add all files
    console.log('📋 Adding files to git...');
    execSync('git add .');
    
    // Check if there are any changes to commit
    try {
      execSync('git diff --cached --exit-code', { stdio: 'ignore' });
      console.log('📝 No changes to commit');
    } catch {
      // There are changes to commit
      console.log('💾 Committing changes...');
      execSync('git commit -m "feat: Add engaging pathological test booking website with animations\n\n🌟 Features:\n- Professional pathological test booking system\n- Home sample collection scheduling\n- Real-time order tracking\n- Secure digital reports access\n- Role-based authentication (Customer/Staff/Admin)\n- Engaging animations with Framer Motion\n- Smooth scrolling with Lenis\n- Responsive design with dark/light themes\n- NABL certified lab integration\n- Payment options (prepaid/postpaid)\n- Notification system\n- Admin dashboard for operations\n\n🛠 Tech Stack:\n- Frontend: React.js, TypeScript, Tailwind CSS\n- Backend: Node.js, Express\n- Database: PostgreSQL with Drizzle ORM\n- Authentication: Replit Auth\n- Animations: Framer Motion, Lenis\n- UI Components: Shadcn/UI\n- Payment: Stripe integration ready\n- Email: SendGrid integration ready"');
    }
    
    // Add remote origin
    console.log('🔗 Setting up remote origin...');
    try {
      execSync(`git remote remove origin`, { stdio: 'ignore' });
    } catch {
      // Remote doesn't exist, which is fine
    }
    execSync(`git remote add origin ${repo.clone_url}`);
    
    // Push to GitHub
    console.log('⬆️ Pushing to GitHub...');
    execSync('git push -u origin main', { stdio: 'inherit' });
    
    console.log('🎉 Successfully published to GitHub!');
    console.log('🌐 Repository URL:', repo.html_url);
    console.log('📱 You can now share your pathological test booking website!');
    
    return repo.html_url;
    
  } catch (error) {
    console.error('❌ Error publishing to GitHub:', error.message);
    throw error;
  }
}

// Run the function
publishToGitHub().catch(console.error);