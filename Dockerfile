# 1. Bazowy obraz z Cypress
FROM cypress/included:14.5.4

# 2. Katalog roboczy
WORKDIR /app

# 3. Kopiowanie projektu
COPY . /app

# 4. Instalacja zależności
RUN echo "Installing dependencies..." && npm ci

# 5. Nadanie uprawnień do pliku sklepu
RUN chmod +x ./shopping-store/shopping-store-linux-amd64

# 6. Nadpisanie ENTRYPOINT aby używać bash zamiast domyślnego "cypress run"
ENTRYPOINT ["/bin/bash", "-c"]

# 7. Uruchomienie sklepu i testów
CMD ["./shopping-store/shopping-store-linux-amd64 & npm run test:ci"]

