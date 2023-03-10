import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import chormelogo from '../assets/webstore.png';
import firefoxlogo from '../assets/ffaddons.png';
import { Trans, useTranslation } from 'react-i18next';

export default function SimpleAccordion() {
  const { t } = useTranslation();
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
          <Typography variant='h6'><b>{t('what_is_request')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" align='left'>
            <Trans i18nKey="what_is_request_text">
              Die Datenschutzgrundverordnung (DSGVO) beinhaltet verschiedene Transparenz- und Auskunftsrechte, die Ihnen bei der Entscheidung, welche Daten Sie an einen Dienstanbieter übermitteln, helfen sollen.
              Unter anderem haben Sie das Recht von einem Anbieter zu erfahren, ob und wenn ja welche Daten über Sie zu welchem Zweck gespeichert werden (das Recht auf Datenauskunft).
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
            </Trans>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant='h6'><b>{t('what_is_path')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Trans i18nKey="what_is_path_text">
              Ein Klickpfad ist eine Aneinanderreihung von Mausklicks und anderer Interaktionen mit einer Webseite (z.B. scrollen).
              DARA nutzt diese Klickpfade, um die Interaktion eines Menschen mit den Anfrageformularen der Dienstanbieter zu simulieren. <br />
              Bei dem Dienstanbieter OTTO wird beispielsweise ein einfacher Klick auf Button wird durch die DARA-Browser-Extension simuliert, bei vielen anderen Anbietern ist der Prozess jedoch komplizierter. Deswegen sprechen wir von einem <i>Klickpfad</i>, d.h. eine Abfolge von Mausklicks wird simuliert.
              Teilweise werden auf mehreren Seiten Optionen ausgewählt (über welche Zeitspanne sollen die Daten ausgewählt werden, in welchem Format sollen sie geliefert werden etc.). Dabei wählt DARA immer die Option, die Ihnen am meisten Daten ausgibt.
              <br />
              <br />
              Dabei unterteilt DARA zwei Arten von Klickpfaden: 1. verifizierte Klickpfade für ausgewählte Anbieter und 2. lokale Klickpfade für andere Anbieter.
              Ein Klickpfad wird als verifiziert angesehen, wenn er vom Forschungsteam erstellt und getestet wurde oder wenn mehrere Nutzer den gleichen lokalen Klickpfad aufgezeichnet und geteilt haben. Diese verifizierten Klickpfade werden beim Laden dieser Webseite vom DARA-Server angefragt.
              Ein lokaler Klickpfad entsteht, wenn Sie den Prozess einer Datenanfrage aufzeichnen. Dieser Klickpfad wird zunächst <b>nur in Ihrem Browser</b> gespeichert. Sollten Sie diesen Klickpfad teilen wollen, um anderen Nutzer:innen die Datenanfrage mit einem Klick zu ermöglichen, werden zunächst alle Tastatureingaben entfernt und anschließend wird der Klickpfad an den DARA Server übermittelt.
              <br />
              <br />
              Zur Aufzeichnung der Klickpfade benutzen wir die DARA Browserextension, die auf der Open-Source Lösung <a href='https://www.automa.site/'>Automa</a> basiert. Die Klickpfade werden in einem spezifischen Automa-Format gespeichert und können so auch dargestellt und nachvollzogen werden.
            </Trans>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h6'><b>{t('what_preconditions')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          {t('what_preconditions_text1')}
          <ol>
            <li>
              <b>Installation</b><br />
              {t('what_preconditions_text2')}
              <Container sx={{ 'align': 'center' }}>
                <table>
                  <tbody>
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
                  </tbody>
                </table>
              </Container>
              {t('what_preconditions_text3')}
            </li>
            <li>
              <b>{t('preperation')}</b><br />
              {t('preperation_text')}
            </li>
            <li>
              <b>{t('start')}</b><br />
              {t('start_text')}
            </li>
            <li>
              <b>{t('end_request')}</b><br />
              {t('end_request_text')}
            </li>
          </ol>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6'><b>{t('how_dara_works')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('how_dara_works_text1')}
            <ol>
              <li>
                <b>{t('visible_process')}</b><br />
                {t('visible_process_text')}
              </li>
              <li>
                <b>{t('invisible_process')}</b><br />
                {t('invisible_process_text')}
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant='h6'><b>{t('received_error')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('received_error_text1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'><b>{t('other_service')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            <Trans i18nKey="other_service_text1">
              Wenn Sie Daten von anderen als den oben aufgezählten Anbietern anfragen wollen, haben Sie verschiedene Möglichkeiten.
              Eine Auflistung weiterer Anbieter mit Anleitungen finden Sie beispielsweise hier:  <a href='https://justgetmydata.com/'>justgetmydata.com</a> [eng].
              Falls Sie einen Anbieter mit einem Webformular gefunden haben, würden wir uns freuen, wenn Sie den Klickpfad aufzeichnen.
              Für Anbieter, die keine Angabe zur Datenauskunft machen oder die eine e-Mail-Adresse als Kontaktpunkt angeben (wie Beispielsweise Netflix, DB, Flixbus, Miles, Zalando, und viele weitere), können Sie andere Tools nutzen, die Sie bei der Antragsstellung unterstützen: <a href='https://www.datenanfragen.de/'>www.datenanfragen.de</a> .
            </Trans>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}



