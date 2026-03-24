import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PinScreen from './pages/PinScreen';
import PrincipalScreen from './pages/PrincipalScreen';
import GalleryScreen from './pages/GalleryScreen';
import CallListScreen from './pages/CallListScreen';
import SmsListScreen from './pages/SmsListScreen';
import ConversationScreen from './pages/ConversationScreen';
import ErrorScreen from './pages/ErrorScreen';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PinScreen />} />

                <Route path="/principal" element={<PrincipalScreen />} />

                <Route path="/gallery" element={<GalleryScreen />} />
                <Route path="/appels" element={<CallListScreen />} />

                <Route path="/sms" element={<SmsListScreen />} />

                <Route path="/sms/:contactId" element={<ConversationScreen />} />

                <Route path="/error" element={<ErrorScreen />} />

                <Route path="*" element={<PinScreen />} />
            </Routes>
        </Router>
    );
}
