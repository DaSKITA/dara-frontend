import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import chormelogo from '../assets/webstore.png';
import firefoxlogo from '../assets/ffaddons.png';

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
          <Typography variant='h6'><b>Was ist eine Datenauskunft?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" align='left'>
            Die Datenschutzgrundverordnung (DSGVO) beinhaltet verschiedene Transparenz- und Auskunftsrechte, die Ihnen bei der Entscheidung, welche Daten Sie an einen Dienstanbieter übermitteln, helfen sollen.
            Unter anderem haben das Recht von einem Anbieter zu erfahren, ob und wenn ja welche Daten über Sie zu welchem Zweck gespeichert werden (Das Recht auf Datenauskunft).
            Nach Art. 15 (3) DSGVO haben Sie zudem das Recht eine Kopie dieser Daten zu erhalten. Mehr Informationen zum Auskunftsrecht finden Sie beispielsweise auf den Seite des <a href='https://www.bfdi.bund.de/DE/Buerger/Inhalte/Allgemein/Betroffenenrechte/Betroffenenrechte_Auskunftsrecht.html'>Bundesbeauftragten für Datenschutz und die Informationsfreiheit</a> oder der <a href='https://www.verbraucherzentrale.nrw/wissen/digitale-welt/datenschutz/datenauskunft-so-erfahren-sie-was-unternehmen-ueber-sie-wissen-44238'>Verbraucherzentrale NRW</a>.<br />
            <br />
            In der Praxis wird dieses Recht jedoch selten genutzt. Das hat verschiedene Gründe, einerseits sind sich viele Verbraucher:innen ihrer Rechte nicht bewusst, andererseits beinhaltet die Ausübung des Rechts auch einige Hürden und das Ergebnis ist je nach Anbieter unterschiedlich aussagekräftig.
            Die meisten Verbraucher:innen besteht die erste Hürde bei der Ausübung ihrer Rechte bereits in der Beantragung der Daten. Dieser Prozess ist nicht standardisiert. Jeder Anbieter hat eine eigene Lösung, die beliebig komplex ist. Manche Anbieter beantworten nur schriftliche Anfragen, andere erlauben die Beantragung über ein Webformular, das jedoch häufig in den Profileinstellungen versteckt ist.
            DARA erlaubt Ihnen im zweiten Fall, bei Anbietern die ein Webformular bereitstellen, die Ausübung Ihres Auskunftsrechts mit nur einem Klick.
            <br />
            <br />
            Nach der erfolgreichen Antragsstellung mit Hilfe von DARA kann die entsprechende Datenauskunft kann je nach Anbieter innerhalb weniger Minuten bis eines Monats abgerufen werden. Häufig wird eine Nachricht an die mit dem jeweiligen Dienst verknüpfte gesendet, sobald die Datenauskunft erstellt wurde.
            Bitte beachten Sie, dass DARA zu keinem Zeitpunkt Zugriff auf die Datenauskunft hat. Die Sie betreffenden Daten werden - häufig erst nach einem durch Sie veranlassten manuellen Download - lokal auf Ihrem Computer gespeichert, zumeist im Ordner Downloads.
            Die Datenauskünfte haben verschiedene Formate und Inhalte, so dass eine automatisierte Auswertung/Visualisierung (noch) nicht möglich ist. Die Interpretation der Datenauskunft bleibt somit in Ihren Händen.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant='h6'><b>Was ist ein Klickpfad?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ein Klickpfad ist eine Aneinanderreihung von Mausklicks und anderer Interaktionen mit einer Webseite (z.B. scrollen).
            DARA nutzt diese Klickpfade, um die Interaktion eines Menschen mit den Anfrageformularen der Dienstanbieter zu simulieren. <br />
            Bei dem Dienstanbieter OTTO wird beispielsweise ein einfacher Klick auf Button wird durch die DARA-Browser-Extension simuliert, bei vielen anderen Anbietern ist der Prozess jedoch komplizierter. Deswegen sprechen wir von einem <i>Klickpfad</i>, d.h. eine Abfolge von Mausklicks wird simuliert.
            Teilweise werden auf mehreren Seiten Optionen ausgewählt (über welche Zeitspanne sollen die Daten ausgewählt werden, in welchem Format sollen sie geliefert werden etc.). Dabei wählt DARA immer die Option, die Ihnen am meisten Daten ausgibt.
            <br />
            <br />
            Dabei unterteilt DARA zwei Arten von Klickpfaden: 1. verifizierte Klickpfade für ausgewählte Anbieter und 2. lokale Klickpfade für andere Anbieter.
            Ein Klickpfad wird als verifiziert angesehen, wenn er vom Forschungsteam erstellt und getestet wurde oder wenn mehrere Nutzer den gleichen lokalen Klickpfad aufgezeichnet und geteilt haben. Diese verifizierten Klickpfade werden beim Laden dieser Webseite vom DARA-Server angefragt.
            Ein lokaler Klickpfad entsteht, wenn Sie den Prozess einer Datenanfrage aufzeichnen. Dieser Klickpfad wird zunächst <b>nur in Ihrem Browser</b> gespeichert. Sollten Sie diesen Klickpfad teilen wollen, um anderen Nutzer:innen die Datenanfrage mit einem Klick zu ermöglichen, werden zunächst alle Tastatureingaben entfernt und anschließend wird der Klickpfad an den DARA Server übermittelt. <br />

            <br />
            Zur Aufzeichnung der Klickpfade benutzen wir die DARA Browserextension, die auf der Open-Source Lösung <a href='https://www.automa.site/'>Automa</a> basiert. Die Klickpfade werden in einem spezifischen Automa-Format gespeichert und können so auch dargestellt und nachvollzogen werden.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h6'><b>Welche Voraussetzungen sind für die Nutzung von DARA erforderlich?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Um eine automatisierte Auskunft zu erhalten sind folgende Schritte notwendig:
            <ol>
              <li>
                <b>Installation</b><br />
                Sie benötigen die zu Ihrem aktuell genutzten Browser passende Browserextension, die Sie unter den folgenden Links installieren können:
                <Container sx={{ 'align': 'center' }}>
                  <table>
                    <tr>
                      <td>
                        <Container>
                          <a href="https://chrome.google.com/webstore/detail/automa/heolgaalbnnelipfhbccbkdohecmaimo">
                            <img height={'60px'} src={chormelogo} alt="Chrome webstore" />
                          </a>
                        </Container>
                      </td>
                      <td>
                        <Container>
                          <a href="https://addons.mozilla.org/en-US/firefox/addon/dara/">
                            <img height={'60px'} src={firefoxlogo} alt="Firefox add-ons" />
                          </a>
                        </Container>
                      </td>
                    </tr>
                  </table>
                </Container>
              </li>
              <li>
                <b>Vorbereitung</b><br />
                Damit die Beantragung Ihrer Datenauskunft möglichst reibungslos funktioniert sollten Sie sich vor dem Starten einer Datenanfrage bei dem entsprechenden Dienst einloggen.
                Dies sollte im selben Browser geschehen, mit dem Sie auch diese Webseite geöffnet haben, indem Sie einen neuen Tab öffnen und die Seite des jeweiligen Dienstanbieters aufrufen.
              </li>
              <li>
                <b>Starten</b><br />
                Anschließend können Sie die Datenanfrage starten.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6'><b>Wie führt DARA eine Datenanfrage durch?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DARA nutzt sogenannte Klickpfade, um lästige manuelle Arbeit bei der Beantragung einer Datenauskunft zu automatisieren.
            <ol>
              <li>
                <b>Sichtbarer Prozess </b><br />
                Mit dem Klick auf den Button "Sende Datenanfrage" wird die Beantragung angestoßen. Dafür wird die DARA Browserextension genutzt, die im Hintergrund einen neuen Tab öffnet und die notwendigen Schritte automatisiert ausführt.
                Im Vordergrund sehen Sie in der unteren linken Ecke dieser Webseite Statusmeldungen. Im Idealfall warten Sie wenige Minuten, bis eine grüne Meldung "Daten erfolgreich angefragt" erscheint. Falls stattdessen eine gelbe Statusmeldung oder gar eine rote Fehlermeldung erscheint, ist Ihre manuelle Interaktion notwendig. Mehr Informationen hierzu gibt es auch im Abschnitt "Fehlermeldung".                </li>
              <li>
                <b>Unsichtbarer Prozess</b><br />
                Im Hintergrund führt die DARA Extension einen Klickpfad aus, siehe hierzu auch im Abschnitt "Was ist ein Klickpfad"?
                DARA hat zu keinem Zeitpunkt Zugriff auf die Datenauskunft. Die Sie betreffenden Daten werden, häufig erst nach Ihrer Interaktion (z.B. dem Abruf einer e-Mail), lokal auf Ihrem Computer gespeichert.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant='h6'><b>Ich habe eine Fehlermeldung erhalten. Woran liegt das?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Da die Beantragung teilweise kompliziert ist und keine einheitliche Schnittstelle besteht kann es zu verschiedenen Problemen kommen.
            Sie können die Stelle, an der ein Fehler aufgetreten ist, in dem automatisch geöffneten Tab sehen. Wenn dort eine Passwortabfrage o.ä. zu sehen ist liegt hierin oft das Problem. Bitte geben Sie Ihr Passwort ein. Drücken Sie dann ggf. auf "NEUSTART".

            In seltenen Fällen kann der aufgezeichnete Klickpfad ungültig geworden sein, weil sich die Gestaltung der Webseite des Dienstanbieters geändert hat. In diesem Fall müssen Sie die Daten manuell beantragen. Wir würden uns freuen, wenn Sie diesen Prozess neu aufzeichnen und Ihre Aufzeichnung zur Verfügung stellen.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'><b>Ich möchte eine Datenauskunft bei einem anderen Dienst beantragen. Was kann ich tun?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Wenn Sie Daten von anderen als den oben aufgezählten Anbietern anfragen wollen, haben Sie verschiedene Möglichkeiten.
            Eine Auflistung weiterer Anbieter mit Anleitungen finden Sie beispielsweise hier:  <a href='https://justgetmydata.com/'>justgetmydata.com</a> [eng].
            Falls Sie einen Anbieter mit einem Webformular gefunden haben, würden wir uns freuen, wenn Sie den Klickpfad aufzeichnen.
            Für Anbieter, die keine Angabe zur Datenauskunft machen oder die eine e-Mail-Adresse als Kontaktpunkt angeben (wie Beispielsweise Netflix, DB, Flixbus, Miles, Zalando, und viele weitere), können Sie andere Tools nutzen, die Sie bei der Antragsstellung unterstützen: <a href='https://www.datenanfragen.de/'>www.datenanfragen.de</a> .
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}



