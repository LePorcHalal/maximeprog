///////////////////////////////////////////////////////////
//  Objet3DComposite.cpp
//  Implementation of the Class Objet3DComposite
//  Created on:      25-oct.-2018 20:40:33
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Objet3DComposite.h"


Objet3DComposite::Objet3DComposite() {

}

Objet3DComposite::Objet3DComposite(const Objet3DComposite & mdd)
{
	// A Completer...
	for (auto iter = mdd.cbegin(); iter != mdd.cend(); ++iter)
		addChild(*iter);
	outputIndent = mdd.outputIndent;
}

Objet3DComposite::~Objet3DComposite() {
}

Objet3DComposite * Objet3DComposite::clone() const
{
	// A Completer...
	return new Objet3DComposite(*this);
}

void Objet3DComposite::addChild(const Objet3DAbs& obj3d)
{
	// A Completer...
	m_objetContainer.push_back(Objet3DPtr(obj3d.clone()));
}

Objet3DIterator Objet3DComposite::begin() {

	// A Completer...
	return Objet3DIterator(m_objetContainer.begin());
}

Objet3DIterator_const Objet3DComposite::cbegin() const {

	// A Completer...
	return Objet3DIterator_const(m_objetContainer.cbegin());
}

Objet3DIterator_const Objet3DComposite::cend() const {

	// A Completer...
	return Objet3DIterator_const(m_objetContainer.cend());
}

Objet3DIterator Objet3DComposite::end() {

	// A Completer...
	return Objet3DBaseIterator(m_objetContainer.end());
}

Point3D Objet3DComposite::getCenter() const {

	// A Completer...
	return computeCenter();
}

size_t Objet3DComposite::getNbParameters() const
{
	return 0;
}

PrimitiveParams Objet3DComposite::getParameters() const {

	return  PrimitiveParams();
}

void Objet3DComposite::removeChild(Objet3DIterator_const obj3dIt)
{
	// A Completer...
	m_objetContainer.erase(obj3dIt);
}

void Objet3DComposite::moveCenter(const Point3D & delta)
{
	// A Completer...
	for (int i = 0; i < m_objetContainer.size(); i++)
		m_objetContainer[i]->moveCenter(delta);
}

void Objet3DComposite::setCenter(const Point3D& center) {
	// A Completer...
	for (int i = 0; i < m_objetContainer.size(); i++)
		m_objetContainer[i]->moveCenter(center - getCenter());
}

void Objet3DComposite::setParameter(size_t pIndex, float pValue) {

}

Point3D Objet3DComposite::computeCenter() const
{
	// Calcul la moyenne des centres de tous les enfants
	// S'il n'y a pas d'enfant, initialise a (0,0,0)

	// A Completer...
	Point3D moyenneCentre(0, 0, 0);
	for (int i = 0; i < m_objetContainer.size(); i++)
		moyenneCentre += m_objetContainer[i]->getCenter();
	moyenneCentre /= m_objetContainer.size();
	return moyenneCentre;
}

// Variable statique permettant de stocker le niveau d'indentation
size_t Objet3DComposite::outputIndent = 0;

std::ostream& indentation(std::ostream& o, size_t indentLevel)
{
	for (auto iindent = 0; iindent < indentLevel; ++iindent)
		o << "\t";
	return o;
}

std::ostream & Objet3DComposite::toStream(std::ostream & o) const
{
	o << "Composite: center = " << computeCenter() << ": {" << std::endl;
	++outputIndent;
	for (auto it = cbegin(); it != cend(); ++it)
		indentation(o, outputIndent) << *it << std::endl;
	--outputIndent;
	indentation(o, outputIndent) << "}";

	return o;
}
