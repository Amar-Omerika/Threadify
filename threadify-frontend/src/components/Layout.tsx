import { ReactNode } from 'react';
import Navbar from './Navbar';

interface ContainerProps {
  children: ReactNode;
}

const Layout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section>
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </section>
  );
};

export default Layout;
