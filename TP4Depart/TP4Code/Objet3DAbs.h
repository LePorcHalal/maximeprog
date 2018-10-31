///////////////////////////////////////////////////////////
//  Objet3DAbs.h
//  Implementation of the Class Objet3DAbs
//  Created on:      25-oct.-2018 10:31:08
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_)
#define EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_

#include <iostream>

#include "Point3D.h"
#include "Objet3DContainer.h"

class Objet3DAbs
{

public:
	Objet3DAbs() = default;
	virtual ~Objet3DAbs() = default;
	virtual Objet3DAbs* clone() const =0;

	virtual void addChild(const Objet3DAbs& obj3d) =0;
	virtual Objet3DIterator begin() =0;
	virtual Objet3DIterator_const cbegin() const =0;
	virtual Objet3DIterator_const cend() const =0;
	virtual Objet3DIterator end() =0;
	virtual void removeChild(Objet3DIterator_const obj3dIt) = 0;

	virtual Point3D getCenter() const =0;
	virtual void moveCenter(const Point3D& delta) =0;
	virtual void setCenter(const Point3D& center) = 0;

	virtual size_t getNbParameters() const = 0;
	virtual PrimitiveParams getParameters() const = 0;
	virtual void setParameter(size_t pIndex, float pValue) =0;

	friend std::ostream& operator<<(std::ostream& o, const Objet3DAbs& obj3d);

protected:
	virtual std::ostream& toStream(std::ostream& o) const = 0;
};
#endif // !defined(EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_)
