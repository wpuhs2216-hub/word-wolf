import { GameProvider, useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { SetupScreen } from './components/SetupScreen';
import { RoleAssignmentScreen } from './components/RoleAssignmentScreen';
import { DiscussionScreen } from './components/DiscussionScreen';
import { VotingScreen } from './components/VotingScreen';
import { ResultScreen } from './components/ResultScreen';
import { AnimatePresence } from 'framer-motion';

const GameContent = () => {
  const { state } = useGame();

  return (
    <AnimatePresence mode="wait">
      {state.phase === 'setup' && <SetupScreen key="setup" />}
      {state.phase === 'role-assignment' && <RoleAssignmentScreen key="role-assignment" />}
      {state.phase === 'discussion' && <DiscussionScreen key="discussion" />}
      {state.phase === 'voting' && <VotingScreen key="voting" />}
      {state.phase === 'result' && <ResultScreen key="result" />}
    </AnimatePresence>
  );
};

function App() {
  return (
    <GameProvider>
      <Layout>
        <GameContent />
      </Layout>
    </GameProvider>
  );
}

export default App;
