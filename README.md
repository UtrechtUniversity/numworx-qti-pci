# numworx-qti-pci

## Introduction

In this repository you will find software for running Numworx as a PCI component under the TAO platform.

## Prerequisites

The software makes use of the artifacts build by the [numworx-dwo-project](https://github.com/UtrechtUniversity/numworx-dwo-project) repository. 

### Note

This software is rather old and not maintained. It uses very old versions of the numworx project.


## Contents 

### Folder structure

The are 3 folders in this repository.
* taoexport. Software to extract the activities from the Numworx platform
* pciplayer. The older version TAO uses as PCI component.
* imspciplayer. The newer QTI PCI component that modern TAO uses. It follows the IMS standard. It started as a fork of [tspci](https://github.com/Citolab/tspci)

## Usage

To build use ```maven``` and ```npm```.
Extract the activities with taoexport and put them on a public website.
Install the imspciplayer in the TAO platform.
Configure a pci component with links to the activities and the numworx player software.

## License

This work is licensed under the GNU General Public License version 3.
Copyright © 2026, Utrecht University, all rights reserved.

## Contact 
[Wim van Velthoven](mailto:w.p.g.vanvelthoven@uu.nl)

