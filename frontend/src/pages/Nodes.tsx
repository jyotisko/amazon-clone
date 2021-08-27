// A node is a special route for showcasing products belonging to a group.
import React from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import NodesProducts from '../components/Nodes/NodesProducts';

const Nodes: React.FC = () => {
  const { node }: { node: string } = useParams();

  return (
    <React.Fragment>
      <Nav />
      <main className="main main--nodes">
        <NodesProducts node={node} />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Nodes;