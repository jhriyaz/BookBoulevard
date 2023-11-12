import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import AuthContext from './context/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
 

<React.StrictMode>
<AuthContext>
<QueryClientProvider client={queryClient}>

    <RouterProvider router={Routes}>
    </RouterProvider>

</QueryClientProvider>
</AuthContext>
</React.StrictMode>

   
)
