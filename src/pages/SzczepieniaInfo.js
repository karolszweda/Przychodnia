import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link as link } from 'react-router-dom';

function SzczepieniaInfo() {
    return (
        <Container className="my-5">
            <img
                src="/vaccine.jpg"
                alt="Szepienia Info"
                className="img-fluid mb-4"
                style={{width: '200px', height: 'auto'}}
            />

            <h1>Szczepienia przeciw grypie</h1>
            <p className="text-muted">10.10.2024</p>
            <p>
                Rozpoczynamy sezon szczepień przeciw grypie. Zapraszamy do rejestracji,
                aby chronić siebie i swoich bliskich przed poważnymi powikłaniami
                związanymi z grypą. Szczepienia dostępne są zarówno dla dzieci,
                jak i dorosłych.
            </p>
            <p>
                Aby zarezerwować termin szczepienia, przejdź do sekcji <b>Umów wizytę</b>, a następnie
                <b> Szczepienia</b> lub skontaktuj się z naszym zespołem.
            </p>
            <p>
                Jeśli masz pytania dotyczące szczepionki, skonsultuj się z naszymi specjalistami
                za pomocą teleporady lub podczas wizyty stacjonarnej.
            </p>
            <div className="text-center mt-4">
                <Button as={link} to="/typ-rejestracji" variant="primary" size="lg">
                    Umów wizytę
                </Button>
            </div>
        </Container>
    );
}

export default SzczepieniaInfo;
