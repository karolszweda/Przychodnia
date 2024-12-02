import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link as link } from 'react-router-dom';

function NowySpecjalista() {
    return (
        <Container className="my-5">
            <img
                src="/brain.jpg"
                alt="Nowy Specjalista"
                className="img-fluid mb-4"
                style={{width: '200px', height: 'auto'}}
            />

            <h1>Dr Anna Nowak – Nowy Specjalista w Zespole</h1>
            <p className="text-muted">15.10.2024</p>
            <p>
                Z przyjemnością ogłaszamy, że do naszego zespołu dołączyła dr Anna Nowak,
                wybitny specjalista w dziedzinie neurologii. Dr Nowak posiada
                wieloletnie doświadczenie w diagnozowaniu i leczeniu schorzeń neurologicznych
                oraz wprowadzaniu nowoczesnych metod terapii.
            </p>
            <p>
                Dr Nowak ukończyła studia medyczne na Uniwersytecie Medycznym w Warszawie,
                a swoje umiejętności doskonaliła w renomowanych klinikach w kraju i za granicą.
                Jej szczególne zainteresowania obejmują leczenie chorób tarczycy, cukrzycy
                oraz zaburzeń metabolicznych. leczenie migren, padaczki, stwardnienia rozsianego oraz
                innych chorób układu nerwowego.
            </p>
            <p>
                Dzięki dołączeniu dr Nowak nasza ePrzychodnia wzbogaciła się o kolejną
                specjalizację, która pozwoli nam lepiej zadbać o zdrowie naszych pacjentów.
                Zapraszamy do umawiania wizyt z dr Nowak, jak i u innych specjalistów.
            </p>
            <div className="text-center mt-4">
                <Button as={link} to="/typ-rejestracji" variant="primary" size="lg">
                    Umów wizytę
                </Button>
            </div>
        </Container>
    );
}

export default NowySpecjalista;
