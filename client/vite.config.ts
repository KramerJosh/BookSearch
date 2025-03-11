//copied from another project - uses /graphql

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["booksearch-r8i8.onrender.com"],
    host: "0.0.0.0",
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})


// This one right here worked!
// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//         secure: false,
//       },
//     }
//   }
// })





// }

//uncomment this, then change "export default" on line 11 to return
// export default ({ node }) => {
//   process.env = {...process.env, ...loadEnv(mode, process.cwd())};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//         secure: false,
//       },
//     }
//   }
// })

// }

