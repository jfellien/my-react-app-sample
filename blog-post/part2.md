# Wie strukturiert man eine React App

Im Part 1 meines Tutorials habe ich damit begonnen eine React App als Single Web Application in die Azure Cloud zu heben. Diese App hat noch keinerlei Funktionalität oder Design. Mit diesem Part meines Tutorials werde ich meine App strukturieren. Ein weiteres Tutorial wird zur App eine API hinzufügen.

## Die Webseitenstruktur

Ich habe mich für eine klassische Struktur einer Webseite entschieden, mit einer Navigation, einerm Hero, einem Bereich, wo Produkte ausgewählt werden können und einem Footer. Die Navigation wird immer sichtbar sein, wohingegen die anderen Bereiche gescrollt werden können.

![Application Structure](AppStructure.png)

Die Navigation erlaubt es, auf der Sebseite Bereiche direkt anzunavigieren. Der Hero zeigt die Begrüßung und ggf einen Claim an. Im Ticketsbereich werden Produkte angezeiugt, die mite einem Bestellsystem verlinkt sind. Der Footer verweist auf ein paar statische Informationen.

Jeden der Bereiche werde ich detailliert beschreiben.

Zunächst geht es darum die Struktur zu betrachten und daraus abzuleiten, welches die ersten Komponenten sind.

## React Komponenten

React verwendet für eine bessere Strukturierung und Wiederverwendung sogenannte Komponenten. Sie werden als JavaScript Funktionen derstellt.
