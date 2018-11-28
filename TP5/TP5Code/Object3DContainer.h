///////////////////////////////////////////////////////////
//  Object3DContainer.h
//  Implementation of the Class Object3DContainer
//  Created on:      25-oct.-2018 20:29:07
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_)
#define EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_

#include <vector>
#include<list>
#include <memory>

// Configuration du stockage des enfants des Objects composites
using Object3DPtr = std::unique_ptr<class Object3DAbs>;
using Object3DContainer = std::vector<Object3DPtr>;
using Object3DBaseIterator = Object3DContainer::iterator;
using Object3DBaseIterator_const = Object3DContainer::const_iterator;

class Object3DIterator : public Object3DBaseIterator
{
public:
	Object3DIterator(const Object3DContainer::iterator& it) : Object3DBaseIterator(it) {}

	// Operateurs simplifiant l'acces a l'Object 3D sur lequel pointe l'iterateur
	// pour Object3DIterator it;
	//    *it est l'Object 3D
	//    it-> permet d'invoquer une methode sur l'Object 3D
	class Object3DAbs& operator*() { return *((*(Object3DBaseIterator(*this))).get()); }
	class Object3DAbs* operator->() { return (*(Object3DBaseIterator(*this))).get(); }
};

class Object3DIterator_const : public Object3DBaseIterator_const
{
public:
	Object3DIterator_const(const Object3DContainer::const_iterator& it) : Object3DBaseIterator_const(it) {}

	// Operateurs simplifiant l'acces a l'Object 3D sur lequel pointe l'iterateur
	// pour Object3DIterator_const it;
	//    *it est l'Object 3D constant
	//    it-> permet d'invoquer une methode const sur l'Object 3D
	const class Object3DAbs& operator*() { return *((*(Object3DBaseIterator_const(*this))).get()); }
	const class Object3DAbs* operator->() { return (*(Object3DBaseIterator_const(*this))).get(); }
};

// Configuration d'un format d'externalisation des parametres des primitives
using PrimitiveParams = std::vector<float>;

#endif // !defined(EA_1A8475D5_4734_484c_8758_A92F295DDED0__INCLUDED_)
