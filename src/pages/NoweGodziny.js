import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link as link } from 'react-router-dom';

function NoweGodziny() {
    return (
        <Container className="my-5">
            <img
                src="/time.jpg"
                alt="Nowe godziny otwarcia"
                className="img-fluid mb-4"
                style={{width: '200px', height: 'auto'}}
            />

            <h1>Nowe godziny otwarcia</h1>
            <p className="text-muted">05.10.2024</p>
            <p>
                Od października wydłużamy godziny przyjęć w dni powszednie do <strong>20:00</strong>.
                Chcemy, aby nasze usługi były bardziej dostępne dla pacjentów, którzy nie mogą
                przyjść w ciągu dnia.
            </p>
            <p>
                Zachęcamy do skorzystania z tej zmiany i zapraszamy do rejestracji wizyt w dogodnym
                dla Ciebie czasie.
            </p>
            <p>
                Nasz zespół jest gotowy do pomocy zarówno w zakresie konsultacji, jak i badań oraz
                innych usług medycznych.
            </p>
            <div className="text-center mt-4">
                <Button as={link} to="/typ-rejestracji" variant="primary" size="lg">
                    Umów wizytę
                </Button>
            </div>
        </Container>
    );
}

export default NoweGodziny;
