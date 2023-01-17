import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div id="faq">
    <Typography variant='h4' gutterBottom>
        FAQ
    </Typography>
    <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        >
            <Typography>Was ist eine Datenauskunft?</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1" align='left'>
          Sie haben das Recht von einem Anbieter zu erfahren, ob und wenn ja welche Daten über Sie zu welchem Zweck gespeichert werden. Nach Art. 15 (3) DSGVO haben Sie zudem das Recht eine Kopie dieser Daten zu erhalten. Mehr Informationen zum Auskunftsrecht finden Sie beispielsweise auf den Seite des<a href='https://www.bfdi.bund.de/DE/Buerger/Inhalte/Allgemein/Betroffenenrechte/Betroffenenrechte_Auskunftsrecht.html'>Bundesbeauftragten für Datenschutz und die Informationsfreiheit</a> oder der <a href='https://www.verbraucherzentrale.nrw/wissen/digitale-welt/datenschutz/datenauskunft-so-erfahren-sie-was-unternehmen-ueber-sie-wissen-44238'>Verbraucherzentrale NRW</a>.<br></br>
         
          Für Verbaucher:innen besteht die erste Hürde bei der Ausübung ihrer Rechte bereits in der Beantragung der Daten.  Dieser Prozess ist nicht standartisiert. Jeder Anbieter hat eine eigene Lösung, die beliebig komplex ist. Manche Anbieter beantworten nur schriftliche Anfragen, andere erlauben die Beantragung über ein Webformular, das jedoch häufig in den Profileinstellungen versteckt ist.
          DARA,  erlaubt Ihnen im zweiten Fall, bei Anbietern die ein Webformular bereitstellen, die Ausübung Ihres Auskunftsrechts mit nur einem Klick.
        </Typography>
        </AccordionDetails>
    </Accordion>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Was ist ein Klickpfad?</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            Ein Klickpfad ist eine Aneinanderreihung von Mausklicks und anderer Interaktionen mit einer Webseite (z.B. scrollen).
            DARA nutzt diese Klickpfade, um 
        </Typography>
        </AccordionDetails>
    </Accordion>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Welche Voraussetzungen sind für die Nutzung von DARA erforderlich?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Um eine automatisierte Auskunft zu erhalten sind folgende Schritte notwendig
            1. Installation 
            Browserextension, passend zum aktuellen Browser 
            2. Anmeldung
            Einloggen beim Dienst
            3. Starten der Auskunft über diese Webseite
          </Typography>
        </AccordionDetails>
    </Accordion>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Wie kann ich DARA nutzen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            <ol>
                <li>
                    <b>Sichtbarer Prozess </b>
                    Klick auf ...
                    Es öffnet sich ein neuer Tab
                    Statusmeldungen erfolgen in der unteren linken Ecke - falls eine Fehlermeldung kommt siehe auch 
                </li>
                <li>
                    <b>Unsichtbarer Prozess</b>
                    Klickpfad - Beispiel OTTO: einfacher Klick auf Button wird durch die DARA-Browser-Extension simuliert, bei vielen anderen Anbietern ist der Prozess jedoch komplizierter. Deswegen sprechen wir von einem <i>Klickpfad</i>, d.h. eine Abfolge von Mausklicks wird simuliert.
                    Teilweise werden auf mehreren Seiten Optionen ausgewählt (über welche Zeitspanne sollen die Daten ausgewählt werden, in welchem Format sollen sie geliefert werden etc.). Dabei wählt DARA immer die Option, die Ihnen am meisten Daten ausgibt.
                    basier
                    DARA hat zu keinem Zeitpunkt Zugriff auf die Datenauskunft. Die Sie betreffenden Daten werden lokal auf Ihrem Computer gespeichert. 
                </li>
                <li>
                <b>Ergebnis</b>
            Die Datenauskunft kann je nach Anbieter innerhalb weniger Minuten bis eines Monats abgerufen werden. Häufig wird eine Nachricht an die mit dem jeweiligen Dienst verknüpfte gesendet, sobald die Datenauskunft erstellt wurde.
            Bitte beachten Sie, dass DARA zu keinem Zeitpunkt Zugriff auf die Datenauskunft hat. Die Sie betreffenden Daten werden - häufig erst nach einem durch Sie veranlassten manuellen Download - lokal auf Ihrem Computer gespeichert, zumeist im Ordner Downloads.
            Die Datenauskünfte haben verschiedene Formate und Inhalte, so dass eine automatisierte Auswertung/Visualisierung (noch) nicht möglich ist.
                </li>
            </ol>
          </Typography>
        </AccordionDetails>
    </Accordion>
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Ich habe eine Fehlermeldung erhalten. Woran liegt das?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Da die Beantragung teilweise kompliziert ist und keine einheitliche Schnittstelle besteht kann es zu verschiedenen Problemen kommen.
            1. Authentifizierung 
            A. Überprüfen Sie, ob Sie bei dem Dienst eingeloggt sind.
            B. In manchen Prozessen ist eine zusätzliche, nicht automatisierbare Passwortabfrage/ Sicherheitsfrage zu lösen.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
        <Typography>Ich möchte eine Datenauskunft bei einem anderen Dienst beantragen. Was kann ich tun?</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1">
          Wenn Sie Daten von anderen als den oben aufgezählten Anbietern anfragen wollen, haben Sie verschiedene Möglichkeiten.
          Eine Auflistung weiterer Anbieter mit Anleitungen finden Sie beispielsweise hier: {/*todo*/}
          Falls Sie einen Anbieter mit einem Webformular gefunden haben, würden wir uns freuen, wenn Sie den Klickpfad aufzeichnen.
          Für Anbieter, die keine Angabe zur Datenauskunft machen oder die eine e-Mail-Adresse als Kontaktpunkt angeben, können Sie andere Tools nutzen, die Sie bei der Antragsstellung unterstützen: <a href='https://www.datenanfragen.de/'>www.datenanfragen.de</a> . 
        </Typography>
        </AccordionDetails>
    </Accordion>
    </div>
  );
}

    

