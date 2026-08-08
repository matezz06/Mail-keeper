# Hlídač pošty — návod na zprovoznění (jednorázově, ~15 minut)

Aplikace běží jako webová stránka, kterou si přidáte na plochu iPhonu jako ikonu.
Čte váš Gmail **přímo a pouze pro čtení** přes oficiální Google API — žádný prostředník,
data i přihlášení zůstávají jen ve vašem telefonu.

Potřebujete udělat dvě věci: **A)** nahrát aplikaci na web, **B)** povolit jí přístup ke Gmailu u Googlu.

---

## A) Nahrání aplikace na web (GitHub Pages, zdarma)

1. Založte si účet na https://github.com (pokud ho nemáte).
2. Vpravo nahoře **+** → **New repository**. Název např. `hlidac-posty`, viditelnost **Public**, → **Create repository**.
3. Na stránce repozitáře klikněte **uploading an existing file** a přetáhněte tam všech 6 souborů
   z této složky (`index.html`, `manifest.webmanifest`, 3× ikona, `NAVOD.md`). → **Commit changes**.
4. **Settings** (záložka repozitáře) → v levém menu **Pages** → v sekci *Build and deployment*
   zvolte **Deploy from a branch**, branch `main`, složka `/ (root)` → **Save**.
5. Za ~1 minutu se nahoře objeví adresa vaší aplikace, např.:
   `https://VASEJMENO.github.io/hlidac-posty/`
   → tuhle adresu si zkopírujte, budete ji potřebovat v kroku B a je to zároveň váš odkaz do telefonu.

## B) Povolení přístupu ke Gmailu (Google Cloud, zdarma)

1. Jděte na https://console.cloud.google.com a přihlaste se **stejným Google účtem, kam vám chodí pošta**.
2. Nahoře vlevo rozbalte výběr projektů → **New project** → název např. `hlidac-posty` → **Create** a projekt vyberte.
3. V vyhledávání nahoře najděte **Gmail API** → **Enable** (povolit).
4. V menu **APIs & Services → OAuth consent screen**:
   - User type: **External** → Create
   - App name: `Hlidac posty`, support e-mail: váš, developer e-mail: váš → uložit.
   - V sekci **Audience / Test users** klikněte **Add users** a přidejte **svůj vlastní Gmail**.
     (Aplikace zůstane v „testovacím" režimu — pro osobní použití je to přesně to, co chcete;
     nikdo jiný se do ní nepřihlásí.)
5. **APIs & Services → Credentials** → **+ Create credentials** → **OAuth client ID**:
   - Application type: **Web application**
   - Name: `hlidac-posty`
   - **Authorized JavaScript origins** → Add URI → vložte adresu z kroku A **bez lomítka a cesty na konci**,
     tedy jen `https://VASEJMENO.github.io`
   - → **Create**. Zobrazí se **Client ID** (dlouhý text končící na `.apps.googleusercontent.com`) — zkopírujte ho.

## C) První spuštění

1. Otevřete adresu aplikace z kroku A (klidně rovnou na iPhonu v Safari).
2. Aplikace požádá o **Client ID** — vložte ho a uložte (dělá se jen jednou na každém zařízení).
3. Klepněte **Prohledat e-maily** → otevře se přihlášení Googlem → povolte čtení Gmailu.
   (Google zobrazí varování „aplikace není ověřená" — to je u testovacího režimu normální,
   klepněte na *Continue / Pokračovat*.)
4. Hotovo — aplikace načte balíčky a faktury.

## D) Ikona na ploše iPhonu

V Safari na adrese aplikace: tlačítko **Sdílet** (čtvereček se šipkou) → **Přidat na plochu**.
Od té chvíle se chová jako běžná aplikace.

---

### Dobré vědět

- **Aktualizace dat:** aplikace se sama znovu prohledá při každém otevření (pokud je poslední sken
  starší než 30 minut), nebo kdykoli tlačítkem.
- **Soukromí:** přístup je jen pro čtení (`gmail.readonly`), token i data jsou uložené jen v zařízení,
  nikam se neodesílají.
- **Yahoo:** nastavte si v Yahoo přeposílání na Gmail (Settings → Mail forwarding) — pak aplikace vidí obojí.
- **Přihlášení vyprší** zhruba po hodině — aplikace si při dalším skenu řekne o nové tiše sama,
  občas může Google zobrazit potvrzovací okno.
- **Notifikace push** zatím aplikace neumí (model je „otevřu a vidím") — dá se doplnit později,
  vyžadovalo by to malý server.
