///////////////////////////////////////////////////////////
//  Objet3DContainer.h
//  Implementation of the Class Objet3DContainer
//  Created on:      25-oct.-2018 20:29:07
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_)
#define EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_

#include <vector>
#include <memory>

// Configuration du stockage des enfants des objets composites
using Objet3DPtr = std::unique_ptr<class Objet3DAbs>;
using Objet3DContainer = std::vector<Objet3DPtr>;
using Objet3DBaseIterator = Objet3DContainer::iterator;
using Objet3DBaseIterator_const = Objet3DContainer::const_iterator;

class Objet3DIterator : public Objet3DBaseIterator
{
public:
	Objet3DIterator(const Objet3DContainer::iterator& it) : Objet3DBaseIterator(it) {}

	// Operateurs simplifiant l'acces a l'objet 3D sur lequel pointe l'iterateur
	// pour Objet3DIterator it;
	//    *it est l'objet 3D
	//    it-> permet d'invoquer une methode sur l'objet 3D
	class Objet3DAbs& operator*() { return *((*(Objet3DBaseIterator(*this))).get()); }
	class Objet3DAbs* operator->() { return (*(Objet3DBaseIterator(*this))).get(); }
};

class Objet3DIterator_const : public Objet3DBaseIterator_const
{
public:
	Objet3DIterator_const(const Objet3DContainer::const_iterator& it) : Objet3DBaseIterator_const(it) {}

	// Operateurs simplifiant l'acces a l'objet 3D sur lequel pointe l'iterateur
	// pour Objet3DIterator_const it;
	//    *it est l'objet 3D constant
	//    it-> permet d'invoquer une methode const sur l'objet 3D
	const class Objet3DAbs& operator*() { return *((*(Objet3DBaseIterator_const(*this))).get()); }
	const class Objet3DAbs* operator->() { return (*(Objet3DBaseIterator_const(*this))).get(); }
};

// Configuration d'un format d'externalisation des parametres des primitives
using PrimitiveParams = std::vector<float>;

#endif // !defined(EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_)
