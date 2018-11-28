///////////////////////////////////////////////////////////
//  Cylinder.h
//  Implementation of the Class Cylinder
//  Created on:      25-oct.-2018 20:47:26
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_7AFCD1D8_33C4_440c_AB86_C25104795AAF__INCLUDED_)
#define EA_7AFCD1D8_33C4_440c_AB86_C25104795AAF__INCLUDED_

#include "PrimitiveAbs.h"

class Cylinder : public PrimitiveAbs
{

public:
	Cylinder(const Point3D& pt, float r, float ht);
	Cylinder(Object3DAbs& parent, const Point3D& pt, float r, float ht);
	Cylinder(Object3DAbs& parent, const Cylinder& cyl);
	virtual ~Cylinder();
	virtual Cylinder* clone(Object3DAbs& parent) const;

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

	virtual void accept(class Object3DVisitorAbs& vis) const;
	virtual void accept(class Object3DVisitorAbs& vis);

private:
	virtual std::ostream& toStream(std::ostream& o) const;

	float m_dimensions[2];
};
#endif // !defined(EA_7AFCD1D8_33C4_440c_AB86_C25104795AAF__INCLUDED_)
