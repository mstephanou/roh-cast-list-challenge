import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [included, setIncluded] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:8080/');
      const { data, included } = await res.json();
      setData(data);
      setIncluded(included);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const creatives = included?.filter((i) => i.type === 'creatives');

  const cast = included
    ?.filter((i) => i.type === 'castRoles')
    .sort((a, b) => (a.attributes.role < b.attributes.role ? 1 : -1));

  if (data) {
    return (
      <div>
        <h1>{data.attributes.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: data.attributes.shortDescription,
          }}
        />
        <div className='container'>
          <div className='container-item'>
            <h2>Creatives</h2>
            <ul>
              {creatives.map((creative) => (
                <li key={creative.id}>
                  {creative.attributes.name} - {creative.attributes.role}
                </li>
              ))}
            </ul>
          </div>
          <div className='container-item'>
            <h2>Cast</h2>
            <ul>
              {cast.map((member) => (
                <li key={member.id}>
                  {member.attributes.role} - {member.attributes.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
