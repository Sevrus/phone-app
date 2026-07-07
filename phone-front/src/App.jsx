import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PinScreen from "./pages/PinScreen.jsx";
import PrincipalScreen from "./pages/PrincipalScreen.jsx";
import GalleryScreen from "./pages/GalleryScreen.jsx";
import CallListScreen from "./pages/CallListScreen.jsx";
import SmsListScreen from "./pages/SmsListScreen.jsx";
import ConversationScreen from "./pages/ConversationScreen.jsx";
import ErrorScreen from "./pages/ErrorScreen.jsx";
import OffScreen from "./pages/OffScreen.jsx";
import NotesListScreen from "./pages/NotesListScreen.jsx";
import NoteDetailScreen from "./pages/NoteDetailScreen.jsx";
import BrowserScreen from "./pages/BrowserScreen.jsx";
import CameraScreen from "./pages/CameraScreen.jsx";
import { PhoneProvider } from './context/PhoneContext.jsx';

export default function App() {
    return (
        <Router>
            <PhoneProvider>
            <Routes>
                <Route path="/" element={<PinScreen />} />
                <Route path="/principal" element={<PrincipalScreen />} />
                <Route path="/gallery" element={<GalleryScreen />} />
                <Route path="/appels" element={<CallListScreen />} />
                <Route path="/sms" element={<SmsListScreen />} />
                <Route path="/sms/:contactId" element={<ConversationScreen />} />
                <Route path="/error" element={<ErrorScreen />} />
                <Route path="*" element={<PinScreen />} />
                <Route path="/off" element={<OffScreen />} />
                <Route path="/notes" element={<NotesListScreen />} />
                <Route path="/notes/:noteId" element={<NoteDetailScreen />} />
                <Route path="/browser" element={<BrowserScreen />} />
                <Route path="/camera" element={<CameraScreen />} />
            </Routes>
            </PhoneProvider>
        </Router>
    );
}
