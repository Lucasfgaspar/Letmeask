import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/buttom';


import '../styles/auth.scss';
import { FormEvent, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
    const history = useHistory();
    const {user, signInWithGoogle} = useContext(AuthContext)
    const [roomCode, setRoomCode] = useState('');
    
    async function handleCreateRoom () {
        if (!user){
            await signInWithGoogle()
        }

        history.push('/room/new');
               
    }

    async function handleJoinRoom (event: FormEvent) {
        event?.preventDefault();

        if (roomCode.trim() === ''){
            alert('Digite o código da sala')
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()){
            alert('Sala não existe');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Sala fechada')
            return;
        }

        history.push(`room/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong> Crie salas de Perguntas e Respostas ao vivo</strong>
                <p> Tire as dúvidas da sua audiência em tempo-real </p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo da google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> 
                        Ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}