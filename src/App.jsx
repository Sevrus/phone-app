import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmsListScreen from './pages/SmsListScreen';
import ConversationScreen from './pages/ConversationScreen';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sms" element={<SmsListScreen />} />

                <Route path="/sms/:contactId" element={<ConversationScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
